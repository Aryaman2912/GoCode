import express from 'express';
import auth from '../middleware/auth.js'
import {getProblemSubmissions} from '../controllers/submissions.js';

const router = express.Router();

router.get('/', auth, getProblemSubmissions);

export default router;