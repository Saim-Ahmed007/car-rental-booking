import {useEffect, useState } from "react";
import Title from "./../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion/react'
const Cars = () => {
  //getting searchParams from url
    const [searchParams] = useSearchParams()
    const pickupLocation = searchParams.get('pickupLocation')
    const pickupDate = searchParams.get('pickupDate')
    const returnDate = searchParams.get('returnDate')

    const {cars, axios} = useAppContext()
    const [input, setInput] = useState("")
    const isSearchData = pickupLocation && pickupDate && returnDate
    const [filteredCars, setFilteredCars] = useState([])

    const applyFilter = async() => {
      if(input === ''){
        setFilteredCars(cars)
        return null
      }
      const filtered = cars.slice().filter((car)=> {
        return car.brand.toLowerCase().includes(input.toLowerCase())
        || car.model.toLowerCase().includes(input.toLowerCase())
        || car.category.toLowerCase().includes(input.toLowerCase())
        || car.transmission.toLowerCase().includes(input.toLowerCase())
      })
      setFilteredCars(filtered)
    }
    const searchCarAvailability = async() => {
      const {data} = await axios.post('/api/bookings/check-availability', {location : pickupLocation, pickupDate, returnDate})
      if(data.success){
        setFilteredCars(data.availableCars)
        if(data.availableCars.length === 0){
          toast('No cars available')
        }
        return null
      }
    }

    useEffect(()=> {
      isSearchData && searchCarAvailability()
    },[])

    useEffect(()=>{
      cars.length > 0 && !isSearchData && applyFilter()
    },[input, cars])

  return (
    <div>
      <motion.div
        initial = {{opacity: 0, y: 30}}
        animate = {{opacity: 1, y: 0}}
        transition = {{duration: 0.6, ease: 'easeOut'}}
      className="py-20 px-6 bg-[#F1F5F9] my-18 flex flex-col  items-center ">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <motion.div 
         initial = {{opacity: 0, y: 20}}
        animate = {{opacity: 1, y: 0}}
        transition = {{delay: 0.6, duration: 0.5}}
        className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-2xl w-full mt-6 shadow-md">
            <img src={assets.search_icon} alt="" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
          />
          <img src={assets.filter_icon} alt="" className="mr-5 h-4" />
        </motion.div>
      </motion.div>

      {/* all cars */}
      <motion.div
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      transition = {{duration: 0.5, delay: 0.6}}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mb-30 ">
        <p className="text-gray-500 text-base">Showing {filteredCars.length} Cars</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                {
                    filteredCars.map((car,index) => (
                         <motion.div
                          initial = {{opacity: 0, y: 20}}
                          animate = {{opacity: 1, y:0}}
                          transition = {{duration: 0.4, delay: 0.1 * index}}
                         key={index}>
                        <CarCard car={car}/>
                        </motion.div>
                    ))
                }
            </div>
      </motion.div>
    </div>
  );
};

export default Cars;
