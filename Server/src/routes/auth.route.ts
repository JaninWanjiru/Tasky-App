import { Router } from "express";
import verifyUserRegistration from "../middlewares/validateUserRegistration";
import verifyPassStrength from "../middlewares/validatePasswordStrength";
import checkDuplicateUser from "../middlewares/checkDuplicateUser";
import { register, login, logout, updatePassword} from "../controllers/auth.controller";
import userAuth from "../middlewares/userAuth";

const router = Router();

router.post("/register", verifyUserRegistration, checkDuplicateUser, verifyPassStrength,  register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/password', userAuth, updatePassword);

export default router;
