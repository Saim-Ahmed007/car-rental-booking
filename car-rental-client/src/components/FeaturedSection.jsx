import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import CarCard from './CarCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import {motion} from 'motion/react'

const FeaturedSection = () => {
    const navigate = useNavigate()
    const {cars, setCars, axios} = useAppContext()
     const fetchOwnerCars = async() => {
            try {
                const {data} = await axios.get('/api/owner/cars')
                console.log(data)
                if(data.success){
                    setCars(data.cars)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        useEffect(()=>{     
            fetchOwnerCars()
            },[])
    return (
        <motion.div
        initial = {{opacity: 0, y: 40}}
        whileInView = {{ opacity: 1, y: 0}}
        transition = {{duration: 1, ease: 'easeOut'}}
        className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
            <motion.div
            initial = {{opacity: 0, y: 20}}
            whileInView = {{opacity: 1, y: 0}}
            transition = {{duration: 1, delay: 0.5}}
            >
                <Title title="Featured Vehicles" subTitle="Explore our selection of premium vehicles available for your next adventure" />
            </motion.div>
            <motion.div
            initial = {{opacity: 0, y: 100}}
            whileInView = {{opacity: 1, y: 0}}
            transition = {{duration: 1, delay: 0.5}}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
                {
                    cars.slice(0,6).map(car => (
                        <motion.div
                        initial = {{opacity: 0, scale: 0.95}}
                        whileInView = {{ opacity: 1, scale: 1}}
                        transition = {{duration: 0.4, ease: 'easeOut' }}
                        key={car._id}>
                        <CarCard car={car}/>
                        </motion.div>
                    ))
                }
            </motion.div>
           <motion.button
            initial = {{opacity: 0, y: 20}}
            whileInView = {{ opacity: 1, y: 0}}
            transition = {{duration: 0.4, delay: 0.6}}
           onClick={() => {navigate('/cars'); scrollTo(0,0)}} className='flex justify-center items-center gap-2 px-6 py-2 border border-[#c4c7d2] hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>Expolre all cars <img src={assets.arrow_icon} alt="" />
           </motion.button>
        </motion.div>
    );
};

export default FeaturedSection;