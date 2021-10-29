import express from 'express';
import auth from '../middleware/auth.js'
import {problemCompilation} from '../controllers/compile.js';

const router = express.Router();

router.post('/', auth, problemCompilation);

export default router;