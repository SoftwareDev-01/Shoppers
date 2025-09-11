import React from "react";
import { motion } from "framer-motion";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";

function Product() {
  return (
    <motion.div
      className="w-[100vw] min-h-[100vh] bg-black flex flex-col items-center justify-start py-[50px] px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-wide text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Our <span className="text-[#EDE6DB]">Collections</span>
      </motion.h2>

      {/* Latest Collection Section */}
      <motion.div
        className="w-full max-w-[1200px] mb-16 bg-[#03010f] rounded-2xl shadow-lg hover:shadow-[#EDE6DB]/30 transition-shadow duration-300 p-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      >
        <LatestCollection />
      </motion.div>

      {/* Best Seller Section */}
      <motion.div
        className="w-full max-w-[1200px] bg-[#03010f] rounded-2xl shadow-lg hover:shadow-[#EDE6DB]/30 transition-shadow duration-300 p-6"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <BestSeller />
      </motion.div>
    </motion.div>
  );
}

export default Product;
