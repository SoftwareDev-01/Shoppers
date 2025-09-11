import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    
    return (
        <div className='w-[100vw] h-[100vh] bg-[#03010f] flex items-center justify-center flex-col gap-[30px] relative overflow-hidden'>

            {/* Animated Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shine"></div>
            </div>

            {/* 404 Text */}
            <h1 className='text-[30px] md:text-[80px] text-[#90b9ff] font-bold tracking-widest glow-text text-center'>
                404
            </h1>
            <p className='text-[#EDE6DB] md:text-[24px] text-[16px] text-center'>Page Not Found</p>

            {/* Login Button */}
            <button 
                className='bg-[#90b9ff] hover:bg-[#EDE6DB] text-black font-semibold px-[25px] py-[12px] rounded-xl shadow-lg shadow-[#90b9ff77] hover:shadow-[#90b9ffaa] transition-all duration-300'
                onClick={() => navigate("/login")}
            >
                Go to Login
            </button>

            {/* Shiny animation CSS */}
            <style>{`
                @keyframes shine {
                    100% { left: 125%; }
                }
                .animate-shine {
                    animation: shine 2s infinite;
                }
                .glow-text {
                    text-shadow: 0 0 8px #90b9ff, 0 0 15px #90b9ff66, 0 0 20px #90b9ff33;
                }
            `}</style>
        </div>
    )
}

export default NotFound
