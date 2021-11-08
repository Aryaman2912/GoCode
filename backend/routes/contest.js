import express from 'express';

import { getPublicContests, addProblem, addContest, getContest, deleteContest, isValidContest } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', auth, getPublicContests);
router.get('/api/contests/:id',auth, getContest);
router.post('/api/addproblem', auth, addProblem);
router.post('/api/addcontest', auth, addContest);
router.delete('/api/contests/:id', auth, deleteContest);
router.get('/api/contests/:id/is_valid', auth, isValidContest);
export default router;