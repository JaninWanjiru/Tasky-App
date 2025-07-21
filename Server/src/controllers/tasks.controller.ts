import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const client = new PrismaClient();

// creating a task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;
    await client.task.create({
      data: { title, description, userId: id },
    });
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};