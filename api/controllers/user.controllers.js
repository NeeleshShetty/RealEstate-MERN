import User from "../models/user/user.model.js"
import { errorHandler } from "../utils/error"
import bcryptjs from 'bcryptjs'

export const updateUser = async( req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You can update only your account'))
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndDelete(req.params.id,{
            $set:{
                username : req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture:req.body.profilePicture
            }
        },{new:true}) //return the new data instead of old one

        const {password , ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}