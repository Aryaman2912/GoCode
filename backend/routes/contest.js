import express from 'express';

import { getPublicContests } from '../controllers/contest.js'; 

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/api/contests', getPublicContests);

export default router;