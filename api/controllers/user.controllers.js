import User from "../models/user/user.model.js"
import Listing from '../models/listing/listing.model.js'
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.id) {
		return next(errorHandler(401, 'You can update only your account!'));
	}
	try {
		if (req.body.password) {
			req.body.password = bcryptjs.hashSync(req.body.password, 10);
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					profilePicture: req.body.profilePicture,
				},
			},
			{ new: true }
		);
		const { password, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req,res,next)=>{
	if(req.user.id !== req.params.id){
		return next(errorHandler(401,'Unauthorized'))
	}
	
	try {
		await User.findByIdAndDelete(req.params.id)
	res.status(200).json("User account deleted Successfully")
	} catch (error) {
		next(error)
	}
}

export const getUserListing = async (req, res, next) => {
	if (req.user.id === req.params.id) {
		try {
			const listings = await Listing.find({ userRef: req.params.id })
			res.status(200).json(listings)
		} catch (error) {
			next(error)
		}
	} else {
		return next(errorHandler(401, 'You can only view your own listings'));
		
	}
}

export const getUser = async (req,res,next)=>{
	try {
		const user = await User.findById(req.params.id)
	
		if(!user) return next(errorHandler(404,'User Not Found'))
	
		const {password , ...rest} = user._doc
	
		res.status(200).json(rest)
	} catch (error) {
		next(error)
	}
}