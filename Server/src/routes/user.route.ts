import { Router } from "express";
import { getUserDetails, updateUserDetails, updateAvatar } from "../controllers/user.controller";
import userAuth from "../middlewares/userAuth";

const router = Router()

router.get("/user", userAuth, getUserDetails)
router.patch("/user", userAuth, updateUserDetails)
router.patch("/user/avatar", userAuth, updateAvatar)

export default router; 