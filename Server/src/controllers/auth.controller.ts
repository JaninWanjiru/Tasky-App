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
    res.cookie("authToken", token).json(userDetails)
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



