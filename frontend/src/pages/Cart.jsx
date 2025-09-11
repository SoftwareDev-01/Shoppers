'use client'
import React, { useContext, useState, useEffect } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import CartTotal from '../component/CartTotal'

function Cart() {
    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = []
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    })
                }
            }
        }
        setCartData(tempData)
    }, [cartItem])

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] overflow-hidden bg-[#000000] relative'>

            {/* Page Shiny Sweep */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shine"></div>
            </div>

            {/* Page Title */}
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={"YOUR "} text2={"CART"} />
            </div>

            {/* Cart Items */}
            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id)
                    return (
                        <div key={index} className='w-[100%] h-[10%] border-t border-b border-[#444770]'>
                            <div className='relative w-[100%] h-[80%] flex items-start gap-6 py-[10px] px-[20px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[102%] hover:shadow-2xl'>

                                {/* Animated Gradient Border */}
                                <div className='absolute inset-0 rounded-2xl border-[2px] border-transparent bg-gradient-to-r from-[#90b9ff] via-[#EDE6DB] to-[#90b9ff] p-[2px]'>
                                    <div className='w-full h-full bg-[#000000] rounded-[14px]'></div>
                                </div>

                                {/* Product Image */}
                                <img className='relative z-10 w-[100px] h-[100px] rounded-md object-cover transform transition-transform duration-500 hover:scale-110' src={productData.image1} alt="" />

                                {/* Product Info */}
                                <div className='relative z-10 flex flex-col items-start justify-center gap-[10px]'>
                                    <p className='md:text-[25px] text-[20px] text-[#EDE6DB] font-semibold'>{productData.name}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <p className='text-[20px] text-[#EDE6DB]'>{currency} {productData.price}</p>
                                        <p className='w-[40px] h-[40px] text-[16px] text-[#000000] bg-[#EDE6DB] rounded-md flex items-center justify-center border-[1px] border-[#EDE6DB]'>{item.size}</p>
                                    </div>
                                </div>

                                {/* Quantity Input */}
                                <input type='number' min={1} defaultValue={item.quantity}
                                    className='relative z-10 md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[#000000] text-[18px] font-semibold bg-[#EDE6DB] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#EDE6DB] rounded-md'
                                    onChange={(e) => e.target.value === ' ' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                />

                                {/* Delete Icon */}
                                <RiDeleteBin6Line
                                    className='relative z-10 text-[#EDE6DB] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300'
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Cart Total & Checkout */}
            <div className='flex justify-start items-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <button
                        className='text-[18px] hover:bg-[#90b9ff] hover:text-[#000000] cursor-pointer bg-[#1f1c4b99] py-[10px] px-[50px] rounded-2xl text-[#EDE6DB] flex items-center justify-center gap-[20px] border-[1px] border-[#EDE6DB] ml-[30px] mt-[20px] transition-all duration-300 hover:shadow-[0_0_15px_#90b9ff]'
                        onClick={() => {
                            if (cartData.length > 0) {
                                navigate("/placeorder")
                            } else {
                                console.log("Your Cart Is Empty!")
                            }
                        }}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>

            {/* Shiny Animation CSS */}
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

export default Cart
