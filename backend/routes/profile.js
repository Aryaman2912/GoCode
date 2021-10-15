import express from 'express';

const router = express.Router();

import {display} from '../controllers/profile.js';

router.get("/", display);

export default router;