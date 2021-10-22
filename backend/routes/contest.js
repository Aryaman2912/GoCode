import express from 'express';

import { getPublicContests, addProblem } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', getPublicContests);
router.post('/api/addproblem', addProblem);
export default router;