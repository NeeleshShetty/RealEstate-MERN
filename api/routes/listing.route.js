import express from 'express'
import {createListing} from '../controllers/listing.controllers.js'
import { verifyToken } from '../utils/verifyToken.js'
const router = express.Router()

router.post('/create',createListing)

export default router