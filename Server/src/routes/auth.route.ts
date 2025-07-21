import { Router } from "express";
import verifyUserRegistration from "../middlewares/validateUserRegistration";
import verifyPassStrength from "../middlewares/validatePasswordStrength";
import checkDuplicateUser from "../middlewares/checkDuplicateUser";
import { register, login, logout} from "../controllers/auth.controller";

const router = Router();

router.post("/register", verifyUserRegistration, checkDuplicateUser, verifyPassStrength,  register);

router.post('/login', login);

router.post('/logout', logout);

export default router;
