import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser';

dotenv.config()
mongoose.connect(process.env.MONGO_DB).then(console.log('Successfully connected to MongoDB')).catch((error)=> console.log(error))
const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user',userRouter)

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
})
app.listen(3000, () => {
    console.log("Successfully running on Server 3000");
})