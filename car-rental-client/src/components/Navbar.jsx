import { Link, useLocation, useNavigate } from 'react-router-dom';
import {assets, menuLinks} from '../assets/assets'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import {motion} from 'motion/react'

const Navbar = () => {
    const  {setShowLogin, user, logOut, isOwner, axios, setIsOwner} = useAppContext()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async() => {
        try {
          const {data} = await axios.post('/api/owner/change-role') 
          if(data.success){
            setIsOwner(true)
            toast.success(data.message)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <motion.div
        initial = {{y: -20, opacity: 0}}
        animate = {{y: 0, opacity: 1}}
        transition = {{duration: 0.5}}
        className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-[#c4c7d2] relative ${location.pathname === '/' && 'bg-[#F1F5F9]'}`}>
            <Link to='/' className='flex-1'>
            <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="" className='h-8'/>
            </Link>
            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-[#c4c7d2] right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration z-50 ${location.pathname === '/' ? 'bg-[#F1F5F9]' : 'bg-white'} ${open ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}`}>
                {
                    menuLinks.map((menu, index) => (
                        <Link
                        onClick={()=> setOpen(!open)}
                        key={index} to={menu.path}>{menu.name}</Link>
                    ))
                }
                <div className='hidden lg:flex items-center text-sm gap-2 border border-[#c4c7d2] px-3 rounded-full max-w-56'>
                    <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500' placeholder='Search Cars' />
                    <img src={assets.search_icon} alt="search" />
                </div>
                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className='cursor-pointer'>
                        {isOwner ? 'Dashboard': 'List cars'}</button>
                    <button onClick={() => {user ? logOut() : setShowLogin(true)}} className='cursor-pointer px-8 py-2 bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white rounded-lg'>{user ? 'Logout' : 'Login'}</button>
                </div>
            </div>
            <div>
                <button className='sm:hidden cursor-pointer' aria-label='Menu'
                onClick={() => setOpen(!open)}>
                    <img src={open ? assets.close_icon : assets.menu_icon} alt="" />
                </button>
            </div>
        </motion.div>
    );
};

export default Navbar;