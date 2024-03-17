import { Router } from 'express';
import { createQuiz } from '../../controllers/api/quizzes';
import { validateCreateQuizRequestBodyMiddleware } from '../../middlewares/validateRequestBody';
import auth from '../../middlewares/auth';

const router = Router();

router.use(auth);

router.post('/create', validateCreateQuizRequestBodyMiddleware, createQuiz);

export default router;