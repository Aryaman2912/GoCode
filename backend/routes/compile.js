import express from 'express';
import auth from '../middleware/auth'
import {problemCompilation} from '../controllers/compile';

const router = express.Router();

router.post('/', auth, problemCompilation);

export default router;