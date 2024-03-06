import { Router } from 'express';
import { signUp, signIn } from '../../controllers/api/auth';
import { validateSignUpRequestBodyMiddleware } from '../../middlewares/validateRequestBody';

const router = Router();

router.post('/sign-up', validateSignUpRequestBodyMiddleware, signUp);
router.post('/sign-in', signIn);

export default router;
