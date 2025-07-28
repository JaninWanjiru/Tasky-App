import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

// Registering user
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 9);
    await client.user.create({
      data: { firstName, lastName, username, email, password: hashedPass },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// Logging in a user
export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password} = req.body; 
    const user = await client.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      res.status(401).json({ message: "Login credentials not correct" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Login credentials not correct" });
      return;
    }

    const {password: userPassword, dateJoined, lastprofileUpdate, ...userDetails} = user
    const token = jwt.sign(userDetails, process.env.JWT_SECRET!)
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json(userDetails)
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// logging out a user
export const logout = async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
}

// updating user password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { current, new: newPassword } = req.body;
    const { id } = req.user;
    
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    const validPassword = await bcrypt.compare(current, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 9);
    await client.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};



