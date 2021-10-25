import express from 'express';

const router = express.Router();

import {displayPlaylists} from '../controllers/playlist/displayPlaylist.js';
import {show} from '../controllers/playlist/showPlaylist.js';
import {showPlaylist, addProblem} from '../controllers/playlist/editPlaylist.js';
import {display, create} from '../controllers/playlist/createPlaylist.js';
import auth from '../middleware/auth.js'

router.get("/", auth, displayPlaylists);
router.get("/:id", auth, show);
router.get("/edit/:id", auth, showPlaylist);
router.post("/edit/:id", auth, addProblem);
router.get("/create", auth, display);
router.post("/create", auth, create);

export default router;