import { assets } from '../assets/assets';
import {motion} from 'motion/react'

const Footer = () => {
    return (
        <motion.div
        initial = {{opacity: 0, y: 30}}
        whileInView = {{opacity: 1, y: 0}}
        transition = {{duration: 0.6}}
        className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <motion.div
            initial = {{opacity: 0, y: 20}}
            whileInView = {{opacity: 1, y: 0}}
            transition = {{duration: 0.6, delay: 0.2}}
            className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-100'>
                    <motion.img
                    initial = {{opacity: 0}}
                    whileInView = {{opacity: 1}}
                    transition = {{duration: 0.5, delay: 0.3}}
                    src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9' />
                    <motion.p
                    initial = {{opacity: 0}}
                    whileInView = {{opacity: 1}}
                    transition = {{duration: 0.5, delay: 0.4}}
                    className='text-sm'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    </motion.p>
                    <motion.div
                    initial = {{opacity: 0}}
                    whileInView = {{opacity: 1}}
                    transition = {{duration: 0.5, delay: 0.5}}
                    className='flex items-center gap-4 mt-4'>
                        
                        <img className='h-5 w-5' src={assets.facebook_logo} alt="" />
                        
                        <img className='h-5 w-5' src={assets.instagram_logo} alt="" />
                        
                        <img className='h-5 w-5' src={assets.twitter_logo} alt="" />
                        
                        <img className='h-5 w-5' src={assets.gmail_logo} alt="" />
                    </motion.div>
                </div>

                <motion.div
                initial = {{opacity: 0, y: 20}}
                whileInView = {{opacity: 1, y: 0}}
                transition = {{duration: 0.6, delay: 0.4}}
                className='flex flex-wrap justify-between w-1/2 gap-8'>
                    <div>
                    <p className='text-lg text-gray-800'>Quick LINKS</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>RESOURCES</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-lg text-gray-800'>CONTACT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">1234 Luxury Drive</a></li>
                        <li><a href="#">San Francisco, CA 94107</a></li>
                        <li><a href="#">+1 (555) 123-4567</a></li>
                        <li><a href="#">saimahmed.seu.cse@gmail.com</a></li>
                    </ul>
                </div>
                </motion.div>

                
            </motion.div>
            <hr className='border-gray-300 mt-8' />
            <motion.div
            initial = {{opacity: 0, y: 10}}
            whileInView = {{opacity: 1, y: 0}}
            transition = {{duration: 0.6, delay: 0.6}}
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default Footer;