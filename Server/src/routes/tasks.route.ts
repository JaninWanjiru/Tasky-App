import { Router } from "express";
import { createTask, getUserTasks, getSpecificTask, updateTask, deleteTask, restoreTask, completeTask, incompleteTask, getCompletedTasks } from "../controllers/tasks.controller";
import userAuth from "../middlewares/userAuth";
import validateTask from "../middlewares/validateTask";

const router = Router()

router.post('/', userAuth, validateTask, createTask);
router.get('/', userAuth, getUserTasks);
router.get("/completed", userAuth, getCompletedTasks);
router.get('/:taskId', userAuth, getSpecificTask);
router.patch("/:taskId", userAuth, updateTask)
router.delete("/:taskId", userAuth, deleteTask);
router.patch("/restore/:taskId", userAuth, restoreTask);
router.patch("/complete/:taskId", userAuth, completeTask)
router.patch("/incomplete/:taskId", userAuth, incompleteTask)

export default router; 