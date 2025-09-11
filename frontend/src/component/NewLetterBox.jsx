import React, { useState } from 'react'

function NewLetterBox() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            alert(`Thank you for subscribing: ${email}`)
            setEmail('')
        }
    }

    return (
        <div className='w-[100%] h-[40vh] bg-[#010114] flex items-center justify-center flex-col gap-[15px] relative overflow-hidden p-[20px]'>
            
            {/* Shiny Sweep Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shine"></div>
            </div>

            {/* Title */}
            <p className='md:text-[30px] text-[20px] text-[#EDE6DB] font-semibold text-center'>
                Subscribe now & get 20% off
            </p>

            {/* Subtitle */}
            <p className='md:text-[18px] text-[14px] text-center text-[#EDE6DB] font-medium'>
                Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className='w-full md:w-[80%] flex flex-col sm:flex-row items-center justify-center mt-[20px] gap-[15px]'>
                <input 
                    type='email' 
                    placeholder='Enter Your Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full sm:w-[60%] h-[45px] px-[20px] rounded-lg text-[#010114] placeholder:text-[#010114] bg-[#EDE6DB] shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition duration-300'
                    required
                />
                <button 
                    type="submit" 
                    className='w-full sm:w-auto px-[30px] py-[12px] bg-[#010114] text-[#EDE6DB] font-semibold rounded-lg border border-[#EDE6DB] shadow-md hover:bg-[#EDE6DB] hover:text-[#010114] transition-all duration-300'
                >
                    Subscribe
                </button>
            </form>

            {/* Shiny animation CSS */}
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
        </div>
    )
}

export default NewLetterBox
