import { Router } from 'express';
import { signUp, signIn } from '../../controllers/api/auth';
import {
    validateSignUpRequestBodyMiddleware,
    validateSignInRequestBodyMiddleware,
} from '../../middlewares/validateRequestBody';

const router = Router();

router.post('/sign-up', validateSignUpRequestBodyMiddleware, signUp);
router.post('/sign-in', validateSignInRequestBodyMiddleware, signIn);

export default router;
