"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div 
      animate={{ y: [-15, 15, -15] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="relative z-10 w-full max-w-[450px] drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="relative mx-auto w-full flex justify-center">
        <Image
          src="/mockup1.webp"
          alt="Disha Arts Classes App Mockup"
          className="object-contain w-full h-auto"
          width={400}
          height={800}
          priority={true}
        />
      </div>
    </motion.div>
  );
}
