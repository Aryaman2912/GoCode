import express from 'express';

const router = express.Router();

import {display} from '../controllers/profile/profile.js';
import {displayFriends, addFriend} from '../controllers/profile/friends.js';
import {displayProblems} from '../controllers/profile/userProblems.js';
import {displayGivenContests, displayCreatedContests} from '../controllers/profile/userContests.js';
import auth from '../middleware/auth.js'

router.get("/", auth, display);  //localhost:5000/profile
router.get("/friends", auth, displayFriends);  //localhost:5000/profile/friends
router.get("/problems", auth, displayProblems);  //localhost:5000/profile/problems
router.get("/contests", auth, displayGivenContests); // and so on
router.get("/contests", auth, displayCreatedContests);
router.post("/friends", auth, addFriend);

export default router;