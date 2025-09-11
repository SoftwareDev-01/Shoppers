import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start bg-[#000000] gap-[40px] py-[40px] px-4 '>
      
      {/* Title Section */}
      <div className='w-full text-center'>
        <Title text1={"OUR "} text2={"POLICY"} />
        <p className='w-full max-w-[600px] mx-auto text-[13px] md:text-[20px] px-2 text-[#EDE6DB] font-medium mt-2'>
          Customer-Friendly Policies - Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className='w-full flex flex-wrap justify-center gap-[30px] lg:gap-[50px]'>
        
        {/* Easy Exchange Policy */}
        <div className='w-full sm:w-[300px] md:w-[350px] lg:w-[400px] flex flex-col items-center gap-[10px] bg-[#1a1a1a] p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300'>
          <RiExchangeFundsLine className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#EDE6DB]' />
          <p className='font-bold md:text-[25px] text-[19px] text-[#EDE6DB] text-center'>
            Easy Exchange Policy
          </p>
          <p className='font-medium md:text-[18px] text-[12px] text-[#EDE6DB] text-center'>
            Exchange Made Easy — Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* 7 Days Return Policy */}
        <div className='w-full sm:w-[300px] md:w-[350px] lg:w-[400px] flex flex-col items-center gap-[10px] bg-[#1a1a1a] p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300'>
          <TbRosetteDiscountCheckFilled className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#EDE6DB]' />
          <p className='font-bold md:text-[25px] text-[19px] text-[#EDE6DB] text-center'>
            7 Days Return Policy
          </p>
          <p className='font-medium md:text-[18px] text-[12px] text-[#EDE6DB] text-center'>
            Shop With Confidence — 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Best Customer Support */}
        <div className='w-full sm:w-[300px] md:w-[350px] lg:w-[400px] flex flex-col items-center gap-[10px] bg-[#1a1a1a] p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300'>
          <BiSupport className='md:w-[60px] w-[40px] h-[40px] md:h-[60px] text-[#EDE6DB]' />
          <p className='font-bold md:text-[25px] text-[19px] text-[#EDE6DB] text-center'>
            Best Customer Support
          </p>
          <p className='font-medium md:text-[18px] text-[12px] text-[#EDE6DB] text-center'>
            Trusted Customer Support — Your Satisfaction is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
