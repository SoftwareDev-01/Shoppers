import React, { useState, useEffect } from 'react'
import Nav from '../component/Nav'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashions", text2: "Limited Time Only!" },
    { text1: "Explore Our Best collections", text2: "Shop Now!" },
    { text1: "Choose Your Perfect fashion Fit", text2: "Now on Sale!" }
  ]

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === heroData.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        /* Shining cursor effect */
        .cursor-shiny {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, background-color 0.3s ease;
        }
        .cursor-shiny::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          pointer-events: none;
          transition: none;
        }
        .cursor-shiny:hover::after {
          animation: shine 1s forwards;
        }
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
      `}</style>

      <div className="overflow-x-hidden relative top-[70px] bg-black text-white">

        {/* Hero Section with black bg and white text */}
        <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-black transition-colors duration-700">
          <Background heroCount={heroCount} />
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
            className="text-white"
          />
        </div>

        {/* Product Section */}
        <div className="cursor-shiny hover:bg-[#EDE6DB] hover:text-black transition-colors duration-500">
          <Product />
        </div>

        {/* Policy Section */}
        <div className="cursor-shiny hover:bg-[#EDE6DB] hover:text-black transition-colors duration-500">
          <OurPolicy />
        </div>

        {/* Newsletter Section */}
        <div className="cursor-shiny hover:bg-[#EDE6DB] hover:text-black transition-colors duration-500">
          <NewLetterBox />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home
