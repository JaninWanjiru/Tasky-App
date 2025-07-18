import {Router} from 'express';
import verifyUserRegistration from '../middlewares/validateUserRegistration';
import {register} from '../controllers/auth.controller';

const router = Router();

router.post('/register', verifyUserRegistration, register);

export default router;