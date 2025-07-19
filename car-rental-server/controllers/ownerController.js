import User from "../models/user.js"
import fs from 'fs'
import imagekit from './../configs/imagekit.js';
import Car from './../models/car.js';
import Booking from "../models/booking.js";

//api to change role of user
export const changeRoleToOwner = async(req,res) => {
    try {
        const {_id} = req.user
        await User.findByIdAndUpdate(_id, {role: 'owner'})
        res.json({success: true, message: 'now you can list car'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to list car
export const addCar = async(req,res) => {
    try {
        const {_id} = req.user
        const car = JSON.parse(req.body.carData)
        const imageFile = req.file
        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        //optimization through imagekit url transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'}, //width resize
                {quality: 'auto'}, //auto compression
                {format: 'webp'} //convert to modern format
            ]
        })
        const image = optimizedImageUrl
        await Car.create({...car, owner: _id, image})
        res.json({success: true, message: 'car added'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to list owner cars
export const getOwnerCars = async(req,res) => {
    try {
        const {_id} = req.user
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to toggle car availability
export const toggleCarAvailability = async(req,res) => {
    try {
    const {_id} = req.user
    const {carId} = req.body
    const car = await Car.findById(carId)

    //checking is car belongs to the user
    if(car.owner.toString() !== _id.toString()){
        return res.json({success: false, message: 'unauthorized'})
    }
    car.isAvailable = !car.isAvailable
    await car.save()
    res.json({success: true, message: 'availability toggled'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to delete car 
export const deleteCar = async(req,res) => {
    try {
    const {_id} = req.user
    const {carId} = req.body
    const car = await Car.findById(carId)
    //checking is car belongs to the user
    if(car.owner.toString() !== _id.toString()){
        return res.json({success: false, message: 'unauthorized'})
    }
    car.owner = null
    car.isAvailable = false
    await car.save()
    res.json({success: true, message: 'car removed'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to get dashboard data
export const getDashboardData = async(req,res) => {
    try {
        const {_id, role} = req.user
        if(role != 'owner'){
            return res.json({success: false, message: 'unauthorized'})
        }
        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1})
        const pendingBookings = await Booking.find({owner: _id, status: 'pending'})
        const completedBookings = await Booking.find({owner: _id, status: 'confirmed'})
        //calculate monthly revenue from bookings where status is confirmed
        const monthlyRevenue = bookings.filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)
        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({success: true, dashboardData})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//api to update user image
export const updateUserImage = async(req,res) => {
    try {
        const {_id} = req.user
        const imageFile = req.file
        //upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        //optimization through imagekit url transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'}, //width resize
                {quality: 'auto'}, //auto compression
                {format: 'webp'} //convert to modern format
            ]
        })
        const image = optimizedImageUrl
        await User.findByIdAndUpdate(_id, {image})
        res.json({success: true, message: 'image updated' })

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}