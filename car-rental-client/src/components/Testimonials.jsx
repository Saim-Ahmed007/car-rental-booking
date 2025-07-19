import Title from './Title';
import { assets } from '../assets/assets';
import {motion} from 'motion/react'

    
const Testimonials = () => {
     const testimonials = [
        { name: "Emma Rodriguez", address: "Barcelona, Spain", image: assets.testimonial_image_1, rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." },
        { name: "Liam Johnson", address: "New York, USA", image: assets.testimonial_image_2, rating: 4, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." },
        { name: "Sophia Lee", address: "Seoul, South Korea", image: assets.testimonial_image_2, rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides." }
    ];
    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
            <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."/>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial,index) => (
                    <motion.div
                    initial = {{opacity: 0, y: 40}}
                    whileInView = {{opacity: 1, y: 0}}
                    transition = {{duration: 0.6, delay: index * 0.2, ease: 'easeOut'}}
                    viewport={{once: true, amount: 0.3}}
                    key={index} className="bg-white p-6 rounded-xl shadow-lg max-w-xs hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                               <img key={index} src={assets.star_icon} alt='star-icon'/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">{testimonial.review}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;