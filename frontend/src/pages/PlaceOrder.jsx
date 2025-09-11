import React, { useState, useContext } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from "../assets/razorpay.png"
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + "/api/order/verifyrazorpay", response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})
        }
      },
      prefill: {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: '#3399cc' },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }

      if (method === 'cod') {
        const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
        if (result.data) {
          setCartItem({})
          navigate("/order")
        }
      } else if (method === 'razorpay') {
        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
        if (resultRazorpay.data) initPay(resultRazorpay.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-[#03010f] flex flex-col md:flex-row items-center justify-center gap-[50px] p-5 md:p-10'>
      
      {/* Delivery Form */}
      <div className='lg:w-[50%] w-full flex items-center justify-center mt-[20px] md:mt-0'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-full bg-[#0b020f] p-6 rounded-2xl shadow-lg shadow-[#90b9ff20] backdrop-blur-sm transition-transform duration-300 hover:scale-[102%]'>
          
          <Title text1={"DELIVERY "} text2={"INFORMATION"} />
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <input type="text" name='firstName' placeholder='First Name' value={formData.firstName} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
            <input type="text" name='lastName' placeholder='Last Name' value={formData.lastName} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <div className='mt-4'>
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <div className='mt-4'>
            <input type="text" name='street' placeholder='Street' value={formData.street} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <input type="text" name='city' placeholder='City' value={formData.city} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
            <input type="text" name='state' placeholder='State' value={formData.state} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <input type="number" name='pinCode' placeholder='Pin Code' value={formData.pinCode} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
            <input type="text" name='country' placeholder='Country' value={formData.country} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <div className='mt-4'>
            <input type="number" name='phone' placeholder='Phone' value={formData.phone} onChange={onChangeHandler} className='w-full h-[50px] px-4 rounded-md bg-[#1a0c2a] text-white placeholder:text-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#90b9ff] transition-all' required />
          </div>

          <button type='submit' className='mt-6 w-full py-3 bg-[#3bcee848] text-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[102%]'>PLACE ORDER</button>

        </form>
      </div>

      {/* Cart Total & Payment */}
      <div className='lg:w-[50%] w-full flex flex-col items-center justify-center gap-6 mt-[20px] md:mt-0'>
        <div className='w-[90%] lg:w-[70%] p-6 bg-[#0b020f] rounded-2xl shadow-lg shadow-[#90b9ff20] backdrop-blur-sm transition-transform duration-300 hover:scale-[102%]'>
          <CartTotal />
          <div className='mt-4'>
            <Title text1={"PAYMENT "} text2={"METHOD"} />
          </div>

          <div className='flex items-center justify-center gap-6 mt-4'>
            <button onClick={() => setMethod('razorpay')} className={`transition-all duration-300 ${method === 'razorpay' ? 'border-4 border-blue-900 rounded-md' : ''}`}>
              <img src={razorpay} className='w-[150px] h-[50px] object-cover rounded-md' alt="" />
            </button>

            <button onClick={() => setMethod('cod')} className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${method === 'cod' ? 'border-4 border-blue-900' : ''} bg-gradient-to-t from-[#95b3f8] to-white text-[#332f6f]`}>
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder
