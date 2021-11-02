import express from 'express';

const router = express.Router();

import {displayPlaylists} from '../controllers/playlist/displayPlaylist.js';
import {show, comment} from '../controllers/playlist/showPlaylist.js';
import {showPlaylist, addProblem, changeDesc} from '../controllers/playlist/editPlaylist.js';
import {create, display} from '../controllers/playlist/createPlaylist.js';
import auth from '../middleware/auth.js'

router.get("/", auth, displayPlaylists);
router.get("/:id", auth, show);
router.get("/edit/:id", auth, showPlaylist);
router.get("/create", auth, display);
router.post("/edit/:id", addProblem);
router.post("/create", auth, create);
router.post("/:id", auth, comment);
router.post("/edit/:id", auth, changeDesc);

export default router;