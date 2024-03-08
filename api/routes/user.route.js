
import express from 'express'
import {verifyToken} from '../utils/verifyToken.js'
import { updateUser,deleteUser,getUserListing,getUser} from '../controllers/user.controllers.js'
const router = express.Router()

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id',verifyToken,getUserListing)
router.get('/:id',verifyToken,getUser)

export default router