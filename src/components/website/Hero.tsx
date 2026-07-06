'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero({ banners }: { banners?: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if no banners are available
  const displayBanners = banners && banners.length > 0 ? banners : [{ id: 0, image_url: "/banner1.webp" }];

  useEffect(() => {
    if (displayBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === displayBanners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [displayBanners.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === displayBanners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayBanners.length - 1 : prev - 1));
  };

  return (
    <section
      id="home"
      className="relative w-full mt-[65px] lg:mt-[80px] overflow-hidden bg-white"
    >
      <div className="relative w-full">
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={displayBanners[currentIndex].image_url || displayBanners[currentIndex].src}
              alt={`Banner ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1], // Professional smooth spring-like easing
              }}
              className="w-full h-auto block"
            />
          </AnimatePresence>

          {/* Desktop Arrows */}
          {displayBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="
                  hidden lg:flex
                  absolute left-4 top-1/2 -translate-y-1/2
                  w-12 h-12
                  items-center justify-center
                  rounded-full
                  bg-white/80
                  backdrop-blur-md
                  shadow-lg
                  hover:scale-110
                  transition-all
                  z-20
                "
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="
                  hidden lg:flex
                  absolute right-4 top-1/2 -translate-y-1/2
                  w-12 h-12
                  items-center justify-center
                  rounded-full
                  bg-white/80
                  backdrop-blur-md
                  shadow-lg
                  hover:scale-110
                  transition-all
                  z-20
                "
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots */}
          {displayBanners.length > 1 && (
            <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {displayBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "w-8 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
