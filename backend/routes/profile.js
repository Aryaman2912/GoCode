import express from 'express';

const router = express.Router();

import {display} from '../controllers/profile.js';
import {displayFriends, addFriend} from '../controllers/friends.js';
import {displayProblems} from '../controllers/userProblems.js';
import {displayContests} from '../controllers/userContests.js';
import auth from '../middleware/auth.js'

router.get("/", auth, display);
router.get("/friends", auth, displayFriends);
router.get("/problems", auth, displayProblems);
router.get("/contests", auth, displayContests);
router.post("/friends", auth, addFriend);

export default router;