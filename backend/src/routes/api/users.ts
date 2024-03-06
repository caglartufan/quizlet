import { Router } from 'express';
import { getUsers } from '../../controllers/api/users';

const router = Router();

router.get('/', getUsers);

export default router;
