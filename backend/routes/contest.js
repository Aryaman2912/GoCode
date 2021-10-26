import express from 'express';

import { getPublicContests, addProblem, addContest, getContest } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', getPublicContests);
router.get('/api/contests/:id',getContest)
router.post('/api/addproblem', addProblem);
router.post('/api/addcontest', addContest);
export default router;