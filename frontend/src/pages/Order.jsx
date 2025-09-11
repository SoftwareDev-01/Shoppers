import React, { useContext, useState, useEffect } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function Order() {
    const [orderData, setOrderData] = useState([])
    const { currency } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)

    const loadOrderData = async () => {
        try {
            const result = await axios.post(serverUrl + "/api/order/userorder", {}, { withCredentials: true })
            if (result.data) {
                let allOrdersItem = []
                result.data.forEach(order => {
                    order.items.forEach(item => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] pb-[150px] overflow-auto bg-[#03010f]'>
            
            {/* Page Title */}
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={"MY "} text2={"ORDERS"} />
            </div>

            {/* Orders List */}
            <div className='w-[100%] flex flex-col gap-[20px] items-center mt-[20px]'>
                {orderData.map((item, index) => (
                    <div key={index} className='w-full md:w-[90%] border-[1px] border-[#444770] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[102%] hover:shadow-[0_0_20px_#90b9ff] hover:border-[#90b9ff]'>

                        <div className='flex flex-col md:flex-row items-start gap-6 py-[15px] px-[20px] relative bg-[#0a010f] rounded-2xl'>
                            
                            {/* Product Image */}
                            <img src={item.image1} alt="" className='w-full md:w-[130px] h-[130px] rounded-md object-cover transform transition-transform duration-500 hover:scale-105' />

                            {/* Product Info */}
                            <div className='flex flex-col md:flex-1 gap-[8px] relative mt-4 md:mt-0'>
                                <p className='md:text-[25px] text-[20px] text-[#f3f9fc] font-semibold'>{item.name}</p>

                                <div className='flex items-center gap-[12px] flex-wrap'>
                                    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>{currency}{item.price}</p>
                                    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>Quantity: {item.quantity}</p>
                                    <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>Size: {item.size}</p>
                                </div>

                                <p className='md:text-[16px] text-[12px] text-[#aaf4e7]'>Date: <span className='text-[#e4fbff] pl-[5px] md:text-[16px] text-[11px]'>{new Date(item.date).toDateString()}</span></p>
                                <p className='md:text-[16px] text-[12px] text-[#aaf4e7]'>Payment Method: {item.paymentMethod}</p>

                                {/* Status */}
                                <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%] flex items-center gap-[5px]'>
                                    <span className='w-3 h-3 rounded-full bg-green-500'></span>
                                    <p className='md:text-[17px] text-[10px] text-[#f3f9fc]'>{item.status}</p>
                                </div>

                                {/* Track Order Button */}
                                <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                                    <button
                                        className='md:px-[15px] px-[5px] py-[3px] md:py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-700 transition duration-300 hover:shadow-[0_0_10px_#90b9ff]'
                                        onClick={loadOrderData}
                                    >
                                        Track order
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Order
