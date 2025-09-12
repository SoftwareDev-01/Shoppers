import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { motion } from 'framer-motion'

import Logo from "../assets/logo.png"
import google from '../assets/google.png'
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';

function Registration() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name, email, password
      }, { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  // Cursor reactive background light
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const bgImageURL = "/bgg.png" // Your background image path

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.5 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full h-screen relative overflow-hidden font-sans text-white">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageURL}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3a] via-[#0b1f3ad9] to-[#0b1f3ae0] z-10" />
        <div
          className="absolute pointer-events-none w-[300px] h-[300px] bg-[#e6c97a33] rounded-full blur-3xl opacity-20 z-20 transition-all duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            position: "absolute"
          }}
        />
      </div>

      {/* Foreground */}
      <div className="relative z-30 flex flex-col items-center">

        {/* Logo Navbar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} className="w-[40px]" alt="Logo" />
          <h1 className="text-[24px] text-[#f5f1e8] tracking-wider font-serif">Shoppers</h1>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="text-center my-6"
        >
          <h2 className="text-[30px] font-serif text-[#f5f1e8] mb-2">Create Account</h2>
          <p className="text-[#e0dcd0] text-[16px]">Join Shoppers and start your royal journey</p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="w-[90%] max-w-[480px] bg-[#ffffff0a] backdrop-blur-2xl border border-[#ffffff14] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-8 py-10 hover:scale-[1.01] hover:shadow-[0_0_30px_#c7a45e44] transition-all duration-300"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delay: 0.5 }}
        >
          <form onSubmit={handleSignup} className="flex flex-col gap-6">

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 py-3 px-5 rounded-lg bg-gradient-to-r from-[#c7a45e] to-[#e6c97a] text-[#0b1f3a] font-semibold cursor-pointer transition-all duration-300 hover:shadow-[0_0_12px_#e6c97a]"
              onClick={googleSignup}
            >
              <img src={google} alt="Google" className="w-5" />
              Sign up with Google
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-[#aaa] text-sm justify-center"
            >
              <div className="flex-1 h-px bg-[#aaa4]"></div>
              OR
              <div className="flex-1 h-px bg-[#aaa4]"></div>
            </motion.div>

            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-[#f5f1e833] placeholder-[#f5f1e8b4] text-[#f5f1e8] font-medium focus:outline-none focus:border-[#c7a45e] transition duration-300"
            />

            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-[#f5f1e833] placeholder-[#f5f1e8b4] text-[#f5f1e8] font-medium focus:outline-none focus:border-[#c7a45e] transition duration-300"
            />

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-[#f5f1e833] placeholder-[#f5f1e8b4] text-[#f5f1e8] font-medium focus:outline-none focus:border-[#c7a45e] transition duration-300"
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#f5f1e8]"
                onClick={() => setShow(prev => !prev)}
              >
                {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-[#c7a45e] to-[#e6c97a] text-[#0b1f3a] font-semibold text-[16px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_#e6c97a]"
            >
              Create Account
            </motion.button>

            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-[#e0dcd0]"
            >
              Already have an account?{' '}
              <span
                className="text-[#e6c97a] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </motion.p>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Registration
