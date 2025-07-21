import { Router } from "express";
import { createTask, getUserTasks } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";
const router = Router()

router.post('/', userAuth, validateTask, createTask);
router.get('/', userAuth, getUserTasks)

export default router; 