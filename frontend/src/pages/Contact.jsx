'use client'
import React, { useState } from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.png"
import NewLetterBox from '../component/NewLetterBox'
import { motion } from 'framer-motion'

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you can connect an API to send the message
        console.log("Form Submitted:", formData)
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <div className='w-full min-h-[100vh] bg-[#000000] flex flex-col items-center px-4 pt-[80px]'>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className='mb-[50px]'
            >
                <Title text1={"CONTACT "} text2={"US"} />
            </motion.div>

            <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-[50px]'>

                {/* Left Section - Image + Info */}
                <motion.div
                    className='lg:w-[50%] w-full flex flex-col items-center justify-center gap-6'
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={contact}
                        alt="Contact"
                        className='w-[90%] max-w-[450px] rounded-lg shadow-2xl shadow-blue-500/30 object-cover'
                    />
                    <div className='text-[#EDE6DB] text-center lg:text-left'>
                        <p className='font-bold text-[18px]'>Our Store</p>
                        <p>1 Hacker Way, Menlo Park, California US</p>
                        <p className='mt-4 font-bold'>Tel: +1 (415) 555-0198</p>
                        <p>Email: admin@onecart.com</p>
                    </div>
                </motion.div>

                {/* Right Section - Form */}
                <motion.form
                    className='lg:w-[50%] w-full flex flex-col gap-6 bg-[#1a1a1a] p-8 rounded-xl shadow-lg shadow-blue-500/20'
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className='text-[#EDE6DB] text-[20px] font-bold'>Send us a message</p>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className='w-full px-4 py-3 rounded-md bg-[#222831] text-[#EDE6DB] border border-[#EDE6DB] focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition'
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className='w-full px-4 py-3 rounded-md bg-[#222831] text-[#EDE6DB] border border-[#EDE6DB] focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition'
                    />

                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        rows={6}
                        className='w-full px-4 py-3 rounded-md bg-[#222831] text-[#EDE6DB] border border-[#EDE6DB] focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition resize-none'
                    ></textarea>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, backgroundColor: '#90b9ff', color: '#000000' }}
                        whileTap={{ scale: 0.95 }}
                        className='px-6 py-3 rounded-md border border-[#90b9ff] text-[#EDE6DB] font-semibold transition-all duration-300 relative overflow-hidden'
                    >
                        {submitted ? "Message Sent!" : "Submit"}
                    </motion.button>
                </motion.form>
            </div>

            {/* Newsletter Section */}
            <motion.div
                className='w-full mt-[80px]'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <NewLetterBox />
            </motion.div>
        </div>
    )
}

export default Contact
