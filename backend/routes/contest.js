import express from 'express';

import { getPublicContests, addProblem, addContest } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', getPublicContests);
router.post('/api/addproblem', addProblem);
router.post('/api/addcontest', addContest);
export default router;