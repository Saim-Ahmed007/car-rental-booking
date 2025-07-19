import { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from './../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {
    const {axios, currency} = useAppContext()
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: 0,
        location: '',
        description: ''
    })
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(isLoading) return null
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('carData', JSON.stringify(car))
            const {data} = await axios.post('/api/owner/add-car', formData)
            if(data.success){
                toast.success(data.message)
                setImage(null)
                setCar({
                    brand: '',
                    model: '',
                    year: 0,
                    pricePerDay: 0,
                    category: '',
                    transmission: '',
                    fuel_type: '',
                    seating_capacity: 0,
                    location: '',
                    description: ''
                })
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
                {/* car image */}
                <div className='flex items-center gap-2'>
                    <label htmlFor="car-image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt=""
                    className='h-14 rounded cursor-pointer' />
                    <input type="file" id="car-image" accept='image/*' hidden  
                    onChange={e => setImage(e.target.files[0])} />
                    </label>
                    <p>Upload a picture of your car</p>
                </div>

                {/* car brand and model */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col w-full'>
                            <label>Brand</label>
                            <input type="text" placeholder='e.g. BMW, Mercedes, Audi...' required className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})}/>
                        
                    </div>
                    <div className='flex flex-col w-full'>
                            <label>Model</label>
                            <input type="text" placeholder='e.g. X5, E-Class, M4...' required
                            className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.model} onChange={(e) => setCar({...car, model: e.target.value})} />
                    </div>
                </div>

                {/* year daily price and category */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                            <label>Year</label>
                            <input type="number" placeholder='2025' required className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.year} onChange={(e) => setCar({...car, year: e.target.value})}/> 
                    </div>
                    <div className='flex flex-col w-full'>
                            <label>Daily Price ({currency})</label>
                            <input type="number" placeholder='100' required
                            className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.pricePerDay} onChange={(e) => setCar({...car, pricePerDay: e.target.value})} />
                    </div>
                    <div className='flex flex-col w-full'>
                            <label>Category</label>
                            <select value={car.category} onChange={(e) => setCar({...car, category: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'>
                                <option value="">Select a catagory</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="VAN">VAN</option>
                            </select>
                    </div>
                </div>
                {/* Transmission fuel type seat capacity */}
                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                            <label>Transmission</label>
                             <select value={car.transmission} onChange={(e) => setCar({...car, transmission: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
                                <option value="">Select a transmission</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                                <option value="Semi-Automatic">Semi-Automatic</option>
                            </select> 
                    </div>
                    <div className='flex flex-col w-full'>
                            <label>Fuel Type</label>
                             <select value={car.fuel_type} onChange={(e) => setCar({...car, fuel_type: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
                                <option value="">Select a fuel type</option>
                                <option value="Gas">Gas</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                    </div>
                    <div className='flex flex-col w-full'>
                           <label>Seating Capacity ({currency})</label>
                            <input type="number" placeholder='5' required
                            className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.seating_capacity} onChange={(e) => setCar({...car, seating_capacity: e.target.value})} />
                    </div>
                </div>
                {/* location */}
                    <div className='flex flex-col w-full'>
                        <label>Location</label>
                          <select value={car.location} onChange={(e) => setCar({...car, location: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
                                <option value="">Select a location</option>
                                <option value="New York">New York</option>
                                <option value="Los Angels">Los Angels</option>
                                <option value="Houston">Houston</option>
                                <option value="Chicago">Chicago</option>
                            </select>
                    </div>
                {/* description */}
                    <div className='flex flex-col w-full'>
                        <label>Description</label>
                         <textarea placeholder='Describe your car, its condition, and any notable details...' required rows={5}
                            className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'
                            value={car.description} onChange={(e) => setCar({...car, description: e.target.value})} />
                    </div>
                    <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-[#2563EB] text-white rounded-md font-medium w-max cursor-pointer'>
                        <img src={assets.tick_icon} alt="" />
                        {isLoading ? 'Listing...' : 'List Your Car'}
                    </button>
            </form>
        </div>
    );
};

export default AddCar;