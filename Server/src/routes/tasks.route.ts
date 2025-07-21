import { Router } from "express";
import { createTask } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";
const router = Router()

router.post('/', userAuth, validateTask, createTask);

export default router; 