import { Router } from "express";
import { createTask, getUserTasks, getSpecificTask, updateTask, completeTask, incompleteTask, getCompletedTasks } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";

const router = Router()

router.post('/', userAuth, validateTask, createTask);
router.get('/', userAuth, getUserTasks);
router.get('/:taskId', userAuth, getSpecificTask);
router.patch("/:taskId", userAuth, updateTask)
router.patch("/complete/:taskId", userAuth, completeTask)
router.patch("/incomplete/:taskId", userAuth, incompleteTask)
router.get("/completed", userAuth, getCompletedTasks);

export default router; 