import { Router } from "express";
import { createTask, getUserTasks, getSpecificTask, updateTask } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";

const router = Router()

router.post('/', userAuth, validateTask, createTask);
router.get('/', userAuth, getUserTasks);
router.get('/:taskId', userAuth, getSpecificTask);
router.patch("/:taskId", userAuth, updateTask)

export default router; 