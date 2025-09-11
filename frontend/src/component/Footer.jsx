import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-[#030414] text-[#EDE6DB] shadow-lg shadow-black/40">
      {/* Main Footer Section */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start px-5 md:px-12 py-12 gap-10">
        
        {/* Brand Section */}
        <div className="md:w-[30%] w-full">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="OneCart"
              className="w-[35px] h-[35px] md:w-[45px] md:h-[45px]"
            />
            <p className="text-[22px] font-bold hover:text-[#90b9ff] transition-colors duration-300">
              Shoppers
            </p>
          </div>
          <p className="text-[15px] text-[#EDE6DB]/90 leading-[1.7]">
            Shoppers is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery — all
            backed by trusted service designed to make your life easier every
            day.
          </p>
        </div>

        {/* Company Links */}
        <div className="md:w-[25%] w-full">
          <p className="text-[18px] font-semibold mb-5 text-[#EDE6DB]">
            COMPANY
          </p>
          <ul className="space-y-3">
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              Home
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              About Us
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              Delivery
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-[25%] w-full">
          <p className="text-[18px] font-semibold mb-5 text-[#EDE6DB]">
            GET IN TOUCH
          </p>
          <ul className="space-y-3">
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              +91-9765843211
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              contact@shoppers.com
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              +1-123-456-7890
            </li>
            <li className="text-[15px] text-[#EDE6DB]/90 cursor-pointer hover:text-[#90b9ff] transition-colors duration-300">
              admin@shoppers.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#90b9ff]/30">
        <div className="w-full py-4 text-center text-sm text-[#EDE6DB]/90 bg-[#030414] font-medium hover:text-[#90b9ff] transition-colors duration-300">
          © 2025 Shoppers.com — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
