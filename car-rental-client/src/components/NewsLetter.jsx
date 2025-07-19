import Title from "./Title";
import {motion} from 'motion/react'

const NewsLetter = () => {
  return (
    <motion.div
      initial = {{opacity: 0, y: 30}}
      whileInView = {{opacity: 1, y: 0}}
      transition = {{duration: 0.6, ease: 'easeOut'}}
      viewport={{once: true, amount: 0.3}}
    className="flex flex-col justify-center items-center text-center space-y-2 max-md:px-4 my-5 mb-40 ">
      <Title
        title="Never Miss a Deal!"
        subTitle="Subscribe to get the latest offers, new collections, and exclusive discounts."
      />
      <motion.form
      initial = {{opacity: 0, y: 20}}
      whileInView = {{opacity: 1, y: 0}}
      transition = {{duration: 0.5, delay: 0.4 }}
      className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mt-10">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-[#2563EB] hover:bg-[#1F58D8] transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </motion.form>
    </motion.div>
  );
};

export default NewsLetter;
