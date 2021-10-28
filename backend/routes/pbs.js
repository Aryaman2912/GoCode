import express from 'express'
import {pbsController} from '../controllers/pbs.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, pbsController)

export default router