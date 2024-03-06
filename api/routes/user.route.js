
import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { updateUser,deleteUser,getUserListing} from '../controllers/user.controllers.js'
const router = express.Router()

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id',verifyToken,getUserListing)

export default router