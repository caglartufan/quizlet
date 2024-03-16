import { Router } from 'express';
import auth from '../../middlewares/auth';

const router = Router();

router.use(auth);

router.get('/', (req, res, next) => {
    res.json({
        ok: true
    });
});

export default router;