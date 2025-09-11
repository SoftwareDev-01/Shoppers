import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
    const { getCurrentUser,userData,setUserData} = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
    try {
        await axios.get(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
        setUserData(null);       // clear frontend auth state
        setShowProfile(false);    // close dropdown
        navigate("/login");       // redirect to login page
    } catch (error) {
        console.log("Logout failed:", error);
    }
}

    const handleNavClick = (path) => {
        setShowSearch(false)
        setShowProfile(false)
        navigate(path)
    }

    return (
        <>
            <style>{`
                .nav-link {
                    transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s;
                    color: #05f7d3;
                }
                .nav-link:hover {
                    transform: scale(1.05);
                    color: #fff;
                    box-shadow: none; /* remove neon effect */
                }

                .icon-hover {
                    transition: transform 0.2s ease;
                    color: #05f7d3;
                }
                .icon-hover:hover {
                    transform: scale(1.1);
                    filter: none; /* remove neon shadow effect */
                }

                .dropdown {
                    opacity: 0;
                    transform: translateY(-10px);
                    pointer-events: none;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    color: #05f7d3;
                }
                .dropdown.show {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }

                .search-input {
                    color: #05f7d3;
                    background: #03010f;
                    border: 1px solid #05f7d3;
                    transition: box-shadow 0.3s ease;
                }
                .search-input:focus {
                    outline: none;
                    box-shadow: none; /* remove neon effect */
                }

                .mobile-btn {
                    transition: transform 0.15s ease, color 0.3s;
                    color: #05f7d3;
                }
                .mobile-btn:active {
                    transform: scale(0.9);
                }
                .mobile-btn:hover {
                    filter: none; /* remove neon effect */
                }
            `}</style>

            <div className='w-[100vw] h-[70px] bg-[#03010f] fixed top-0 z-50 flex items-center justify-between px-[30px] shadow-[0_0_25px_#05f7d3]'>

                {/* Logo */}
                <div
                    className='w-[20%] lg:w-[30%] flex items-center gap-3 cursor-pointer'
                    onClick={() => handleNavClick("/")}
                >
                    <img src={logo} alt="logo" className='w-[36px] h-[36px] object-contain' />
                    <h1 className='text-[28px] font-serif font-semibold text-[#05f7d3] tracking-wide select-none'>Shoppers</h1>
                </div>

                {/* Navigation Links */}
                <div className='w-[50%] lg:w-[40%] hidden md:flex justify-center'>
                    <ul className='flex items-center gap-6 font-medium select-none'>
                        {['Home', 'Collections', 'About', 'Contact'].map((item, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleNavClick(
                                    item === 'Home' ? '/' :
                                    item === 'Collections' ? '/collection' :
                                    `/${item.toLowerCase()}`
                                )}
                                className='nav-link relative px-5 py-3 rounded-xl cursor-pointer select-none'
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Icons */}
                <div className='w-[30%] flex items-center justify-end gap-6'>
                    {!showSearch ? (
                        <IoSearchCircleOutline
                            className='icon-hover w-[38px] h-[38px] cursor-pointer'
                            onClick={() => setShowSearch(true)}
                            title="Search"
                        />
                    ) : (
                        <IoSearchCircleSharp
                            className='icon-hover w-[38px] h-[38px] cursor-pointer'
                            onClick={() => setShowSearch(false)}
                            title="Close Search"
                        />
                    )}

                    {/* Updated Profile Icon */}
                    {!userData ? (
                        <FaUserCircle
                            className='w-[30px] h-[30px] text-[#05f7d3] cursor-pointer'
                            onClick={() => setShowProfile(prev => !prev)}
                            title="User Profile"
                        />
                    ) : (
                        <div
                            className='w-[32px] h-[32px] bg-[#05f7d3] text-[#03010f] rounded-full flex items-center justify-center cursor-pointer font-semibold select-none shadow-sm'
                            onClick={() => setShowProfile(prev => !prev)}
                            title="User Profile"
                        >
                            {userData?.name.slice(0, 1).toUpperCase()}
                        </div>
                    )}

                    <div className='relative hidden md:block cursor-pointer' onClick={() => handleNavClick("/cart")} title="Cart">
                        <MdOutlineShoppingCart className='icon-hover w-[30px] h-[30px]' />
                        {getCartCount() > 0 && (
                            <span className='absolute -top-2 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-[#05f7d3] text-[#03010f] rounded-full text-[10px] font-semibold shadow-md'>
                                {getCartCount()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Search Input */}
                {showSearch && (
                    <div className='w-[100%] h-[80px] bg-[#03010f] absolute top-[100%] left-0 right-0 flex items-center justify-center px-4 md:px-0 shadow-[0_0_20px_#05f7d3]'>
                        <div className='relative lg:w-[50%] w-[90%]'>
                            <input
                                type='text'
                                className='search-input w-full h-[60px] rounded-full px-5 pr-14 placeholder-[#05f7d3] text-lg font-medium bg-[#03010f] border border-[#05f7d3]'
                                placeholder='Search Here'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                autoFocus
                            />
                            <IoSearchCircleSharp
                                className='absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#05f7d3] pointer-events-none'
                            />
                        </div>
                    </div>
                )}

                {/* Profile Dropdown */}
                <div className={`dropdown absolute w-[220px] bg-[#03010fcc] top-[110%] right-[4%] border border-[#05f7d3] rounded-lg z-50 shadow-[0_0_25px_#05f7d3] backdrop-blur-sm ${showProfile ? 'show' : ''}`}>
                    <ul className='flex flex-col text-[#05f7d3] py-3 select-none'>
                        {!userData && (
                            <li
                                className='px-5 py-3 cursor-pointer hover:bg-[#111111] rounded transition'
                                onClick={() => handleNavClick("/login")}
                            >
                                Login
                            </li>
                        )}
                        {userData && (
                            <li
                                className='px-5 py-3 cursor-pointer hover:bg-[#111111] rounded transition'
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        )}
                        <li
                            className='px-5 py-3 cursor-pointer hover:bg-[#111111] rounded transition'
                            onClick={() => handleNavClick("/order")}
                        >
                            Orders
                        </li>
                        <li
                            className='px-5 py-3 cursor-pointer hover:bg-[#111111] rounded transition'
                            onClick={() => handleNavClick("/about")}
                        >
                            About
                        </li>
                    </ul>
                </div>

                {/* Mobile Nav */}
                <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#03010f] md:hidden z-50 shadow-[0_0_15px_#05f7d3]'>
                    {[{ icon: <IoMdHome className='w-[28px] h-[28px]' />, label: 'Home', path: '/' },
                      { icon: <HiOutlineCollection className='w-[28px] h-[28px]' />, label: 'Collections', path: '/collection' },
                      { icon: <MdContacts className='w-[28px] h-[28px]' />, label: 'Contact', path: '/contact' },
                      { icon: <MdOutlineShoppingCart className='w-[28px] h-[28px]' />, label: 'Cart', path: '/cart' }].map(({ icon, label, path }, idx) => (
                        <button
                            key={idx}
                            className='mobile-btn flex flex-col items-center justify-center gap-1 focus:outline-none relative'
                            onClick={() => handleNavClick(path)}
                            aria-label={label}
                        >
                            {icon}
                            {label}
                            {label === 'Cart' && getCartCount() > 0 && (
                                <span className='absolute top-1 right-5 w-[18px] h-[18px] flex items-center justify-center bg-[#05f7d3] text-[#03010f] rounded-full text-[9px] font-semibold shadow-md'>
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Nav
