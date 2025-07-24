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

// getting all tasks belonging to a specific user
export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const tasks = await client.task.findMany({
      where: {
        userId: id,
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// getting a specific task
export const getSpecificTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { id } = req.user;
    const task = await client.task.findFirst({
      where: {
        AND: [{id: taskId}, {userId: id}, {isDeleted: false}]
      },
    })
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// updating a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;
    await client.task.update({
      where: { id: taskId },
      data: {
        title: title && title,
        description: description && description
      },
    });
    res.status(200).json({ message: "Task updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// marking a task as completed
export const completeTask = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    await client.task.updateMany({
      where: { id: taskId, userId, isDeleted: false, isCompleted: false },
      data: { isCompleted: true }
    });
    res.status(200).json({ message: "Task marked as completed" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// getting completed tasks
export const getCompletedTasks = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const completedTasks = await client.task.findMany({
      where: {
        userId,
        isDeleted: false,
        isCompleted: true,
      },
    });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch completed tasks" });
  }
};

// marking a task as not completed
export const incompleteTask = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    await client.task.updateMany({
      where: { id: taskId, userId, isDeleted: false, isCompleted: true },
      data: { isCompleted: false }
    });
    res.status(200).json({ message: "Task marked as incomplete" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// marking a task as deleted
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    // Only update if the task belongs to the user and is not already deleted
    await client.task.updateMany({
      where: { id: taskId },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};
