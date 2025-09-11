import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Card({ name, image, id, price }) {
    const { currency } = useContext(shopDataContext)
    const navigate = useNavigate()

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='relative w-[300px] max-w-[90%] h-[400px] bg-[#03010f] rounded-lg cursor-pointer border-[1px] border-[#80808049] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
            onClick={() => navigate(`/productdetail/${id}`)}
        >
            {/* Shiny Gradient Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-shine"></div>
            </div>

            {/* Product Image */}
            <div className='relative w-full h-[80%] overflow-hidden rounded-sm'>
                <img
                    src={image}
                    alt={name}
                    className='w-full h-full object-cover transform transition-transform duration-500 hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#19183B]/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500'></div>
            </div>

            {/* Product Info */}
            <div className='p-3 flex flex-col'>
                <div className='text-[#EDE6DB] text-[18px] font-semibold truncate'>
                    {name}
                </div>
                <div className='text-[#EDE6DB] text-[14px] font-medium mt-1'>
                    {currency} {price}
                </div>
            </div>

            {/* Shiny Animation */}
            <style>{`
                @keyframes shine {
                    100% { left: 125%; }
                }
                .animate-shine {
                    animation: shine 1s forwards;
                    transition: none;
                }
                div:hover > .animate-shine {
                    animation: shine 1s forwards;
                }
            `}</style>
        </motion.div>
    )
}

export default Card
