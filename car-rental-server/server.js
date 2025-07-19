import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'

const app = express()
const port = 3000

await connectDB()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.get("/", (req,res) => {
    res.send("Server is running")
})
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

app.listen(port, ()=>{
    console.log(`Server is listening from port ${port}`)
})