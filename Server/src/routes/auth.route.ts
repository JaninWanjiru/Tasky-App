import { Router } from "express";
import verifyUserRegistration from "../middlewares/validateUserRegistration";
import verifyPassStrength from "../middlewares/validatePasswordStrength";
import { register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", verifyUserRegistration, verifyPassStrength, register);

export default router;
