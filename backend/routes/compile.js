import express from 'express';

import {problemCompilation} from '../controllers/compile';

const router = express.Router();

router.post('/submit', problemCompilation);

export default router;