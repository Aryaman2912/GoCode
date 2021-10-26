import express from 'express';

const router = express.Router();

import {display} from '../controllers/profile/profile.js';
import {displayFriends, addFriend} from '../controllers/profile/friends.js';
import {displayProblems} from '../controllers/profile/userProblems.js';
import {displayContests} from '../controllers/profile/userContests.js';
import auth from '../middleware/auth.js'

router.get("/", auth, display);
router.get("/friends", auth, displayFriends);
router.get("/problems", auth, displayProblems);
router.get("/contests", auth, displayContests);
router.post("/friends", auth, addFriend);

export default router;