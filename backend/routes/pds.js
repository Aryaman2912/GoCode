import express from 'express'
import { pdsController } from '../controllers/pds.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, pdsController)

export default router