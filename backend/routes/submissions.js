import express from 'express';
import auth from '../middleware/auth'
import {getProblemSubmissions} from '../controllers/submissions';

const router = express.Router();

router.get('/', auth, getProblemSubmissions);

export default router;