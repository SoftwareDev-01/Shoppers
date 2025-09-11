import React from 'react'
import Title from '../component/Title'
import about from "../assets/about.png"
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-[#03010f] gap-[50px] pt-[80px]'>
      <Title text1={"ABOUT "} text2={"US"}/>
      
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
            <img src={about} alt="" className='lg:w-[65%] w-[80%] shadow-lg shadow-[#90b9ff55] rounded-sm transition-transform duration-500 hover:scale-105'/>
        </div>
        
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
           <p className='lg:w-[80%] w-[100%] text-[#EDE6DB] md:text-[16px] text-[13px]'>
            Shoppers born for smart, seamless shopping-created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, great value, Shoppers makes your Online Shopping experience simple, satisfying, and stress-free  
           </p>
           <p className='lg:w-[80%] w-[100%] text-[#EDE6DB] md:text-[16px] text-[13px]'>
            At Shoppers, we believe shopping should be simple, not complicated. We've built a seamless online experience where you can find everything you need, all in one place. Our mission is to connect you with quality products and brands, making your everyday easier and more enjoyable. Discover the convenience of Shoppers and simplify your shopping today!
           </p>
           <p className='lg:w-[80%] w-[100%] text-[15px] text-[#EDE6DB] lg:text-[18px] mt-[10px] font-bold'>
            Our Mission
           </p>
           <p className='lg:w-[80%] w-[100%] text-[#EDE6DB] md:text-[16px] text-[13px]'>
            Our mission at Shoppers is to revolutionize your shopping experience by providing a single, intuitive platform for all your needs. We're dedicated to offering a diverse range of high-quality products, ensuring convenience and satisfaction with every click. We strive to simplify your life, giving you back valuable time and making online shopping truly effortless.
           </p>
        </div>
      </div>

      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={"WHY "} text2={"CHOOSE US"}/>
        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px] gap-[20px]'>
            {/* Card 1 */}
            <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-300 flex items-center justify-center gap-[20px] flex-col px-[30px] py-[20px] text-[#EDE6DB] backdrop:blur-[2px] bg-[#ffffff0b] 
                            shadow-lg shadow-[#90b9ff44] hover:shadow-[#90b9ff99] hover:scale-105 transition-all duration-500 transform rounded-xl'>
                <b className='text-lg md:text-xl'>Quality Assurance</b>
                <p className='text-[13px] md:text-[15px] text-center'>
                 At Shoppers, quality is our top priority. We rigorously inspect every product, from selection to delivery, guaranteeing excellence and your complete satisfaction. 
                </p>
            </div>

            {/* Card 2 */}
            <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-300 flex items-center justify-center gap-[20px] flex-col px-[30px] py-[20px] text-[#EDE6DB] backdrop:blur-[2px] bg-[#ffffff0b] 
                            shadow-lg shadow-[#90b9ff44] hover:shadow-[#90b9ff99] hover:scale-105 transition-all duration-500 transform rounded-xl'>
                <b className='text-lg md:text-xl'>Convenience</b>
                <p className='text-[13px] md:text-[15px] text-center'>
                 At Shoppers, we believe shopping should be simple and stress-free. We've created a platform where you can find everything you need in one place, delivering convenience right to your doorstep. 
                </p>
            </div>

            {/* Card 3 */}
            <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-300 flex items-center justify-center gap-[20px] flex-col px-[30px] py-[20px] text-[#EDE6DB] backdrop:blur-[2px] bg-[#ffffff0b] 
                            shadow-lg shadow-[#90b9ff44] hover:shadow-[#90b9ff99] hover:scale-105 transition-all duration-500 transform rounded-xl'>
                <b className='text-lg md:text-xl'>Exceptional Customer Service</b>
                <p className='text-[13px] md:text-[15px] text-center'>
                 Our dedicated customer service team is always ready to assist you, offering helpful support for any query or concern. We're committed to ensuring your experience is seamless and enjoyable from start to finish. 
                </p>
            </div>
        </div>
      </div>
       
      <NewLetterBox/>
    </div>
  )
}

export default About
