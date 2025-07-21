import { Router } from "express";
import { createTask, getSpecificTask, getUserTasks } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";
const router = Router()

router.post('/', userAuth, validateTask, createTask);
router.get('/', userAuth, getUserTasks);
router.get('/:taskId', userAuth, getSpecificTask);

export default router; 