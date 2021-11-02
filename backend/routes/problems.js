import express from 'express';

import getProblemController from '../controllers/problems.js'; 

const router = express.Router();

router.get('/', getProblemController);

export default router;