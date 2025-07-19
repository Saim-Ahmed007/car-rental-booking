import { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const {user, axios, fetchUser} = useAppContext()
    const location = useLocation()
    const [image, setImage] = useState('')

    const updateImage = async() => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            const {data} = await axios.post('/api/owner/update-image', formData)
            if(data.success){
                fetchUser()
                toast.success(data.message)
                setImage('')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-15 md:max-w-60 border-r border-[#c4c7d2] text-sm'>
            <div className='group relative'>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : user?.image || "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className='w-9 h-9 md:h-14 md:w-14 rounded-full mx-auto' />
                    <input type="file" id="image" accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
                    <div className='absolute hidden top-0 bottom-0 right-0 left-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                    <img src={assets.edit_icon} alt="" />
                    </div>
                </label>
            </div>
            {image && (
                <button onClick={updateImage} className='absolute top-0 right-0 flex gap-1 p-2 bg-[#2563EB]/10 text-[#2563EB] cursor-pointer'>Save<img src={assets.check_icon} width={13} alt="" />
                </button>
            )}
            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>
            <div className='w-full'>
            {ownerMenuLinks.map((link, index) => (
                <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 pr-5 first:mt-6 ${link.path === location.pathname ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'text-gray-600'}`}>
                    <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="" />
                    <span className='max-md:hidden'>{link.name}</span>
                    <div className={`${link.path === location.pathname && 'bg-[#2563EB] h-8 w-1.5 rounded-l right-0 absolute'}`}>
                    </div>
                </NavLink>
            ))}
            </div>
        </div>
    );
};

export default Sidebar;