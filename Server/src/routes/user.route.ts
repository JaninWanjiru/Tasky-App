import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller";
import userAuth from "../middlewares/userAuth";

const router = Router()

router.get("/user", userAuth, getUserDetails)

export default router; 