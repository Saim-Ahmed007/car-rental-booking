import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from './../models/car.js';

//generate jwt token
const generateToken = (userId) => {
    const payload = userId
    return jwt.sign(payload, process.env.JWT_SECRET)
}

//register user
export const userRegister = async(req,res) =>{
    try {
        const {name, email, password} = req.body
    if(!name || !email || !password || password.length < 8){
        return res.json({success: false, message: "fill all the fields"})
    }
    const userExist = await User.findOne({email})
    if(userExist){
        return res.json({success: false, message: 'user already exist'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({name, email, password: hashedPassword})
    const token = generateToken(user._id.toString())
    res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//user login
export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: 'user not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: 'invalid credentials'})
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//get users using token
export const getUsers = async(req,res) => {
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//get all cars for the frontend
export const getCars = async() => {
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}