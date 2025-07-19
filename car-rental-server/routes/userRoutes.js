import express from 'express'
import { loginUser, userRegister, getUsers, getCars } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'


const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', loginUser)
userRouter.get('/allUsers', protect, getUsers)
userRouter.get('/cars', protect, getCars)

export default userRouter