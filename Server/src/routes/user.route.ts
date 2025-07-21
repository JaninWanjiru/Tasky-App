import { Router } from "express";
import { getUserDetails, updateUserDetails } from "../controllers/user.controller";
import userAuth from "../middlewares/userAuth";

const router = Router()

router.get("/user", userAuth, getUserDetails)
router.patch("/user", userAuth, updateUserDetails)

export default router; 