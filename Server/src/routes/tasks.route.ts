import { Router } from "express";
import { createTask } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";

const router = Router()

router.post('/', userAuth, createTask);

export default router; 