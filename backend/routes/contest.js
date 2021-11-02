import express from 'express';

import { getPublicContests, addProblem, addContest, getContest, deleteContest, isValidContest } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', getPublicContests);
router.get('/api/contests/:id',getContest);
router.post('/api/addproblem', addProblem);
router.post('/api/addcontest', addContest);
router.delete('/api/contests/:id', deleteContest);
router.get('/api/contests/:id/is_valid', isValidContest);
export default router;