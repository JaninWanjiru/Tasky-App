import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

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