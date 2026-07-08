"use client";

import React, { useRef } from "react";
import { Flame, ChevronLeft, ChevronRight, Zap, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

const courses = [
  {
    id: 1,
    image:
      "https://dishaonlineclasses.com/admindp/admindp/uploads/courses/1775887619_sci%20hin.png",
    link: "https://dishaonlineclasses.com/course-details.php?id=36",
    badge: "NEW BATCH",
    badgeColor: "blue",
  },
  {
    id: 3,
    image:
      "https://dishaonlineclasses.com/admindp/admindp/uploads/courses/1775282090_11th%20sci%20english%20batch.png",
    link: "https://dishaonlineclasses.com/course-details.php?id=35",
    badge: "NEW BATCH",
    badgeColor: "blue",
  },
  {
    id: 4,
    image:
      "https://dishaonlineclasses.com/admindp/admindp/uploads/courses/1768808839_sci.png",
    link: "https://dishaonlineclasses.com/course-details.php?id=29",
    badge: "NEW BATCH",
    badgeColor: "blue",
  },
  {
    id: 2,
    image:
      "https://dishaonlineclasses.com/admindp/admindp/uploads/courses/1768808277_scieng.png",
    link: "https://dishaonlineclasses.com/course-details.php?id=28",
    badge: "NEW BATCH",
    badgeColor: "blue",
  },
];

export default function TrendingCourses() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-section)" }}
    >
      {/* Artistic wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10" fill="var(--bg-page)">
          <path d="M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-8 w-64 h-64 bg-[#1a2e6c]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-8 w-64 h-64 bg-[#c0202a]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Header — side by side */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Flame className="w-4 h-4 fill-current" />
              Most Enrolled Arts Courses
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Top Arts{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Courses
              </span>
            </motion.h2>

            {/* Brushstroke underline */}
            <svg viewBox="0 0 200 10" className="w-48 h-2.5 mt-3 mb-4" fill="none">
              <path d="M5 5 Q50 2 100 5 Q150 8 195 5" stroke="url(#tcGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <defs>
                <linearGradient id="tcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a2e6c" />
                  <stop offset="100%" stopColor="#c0202a" />
                </linearGradient>
              </defs>
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Unlock your potential with Bihar's top-rated Arts faculty and expertly crafted batch courses.
            </motion.p>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              ref={prevRef}
              className="course-prev w-12 h-12 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-all duration-300 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #1a2e6c, #c0202a)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.border = "none";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border-color)";
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              ref={nextRef}
              className="course-next w-12 h-12 rounded-2xl shadow-md flex items-center justify-center hover:scale-110 transition-all duration-300 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #1a2e6c, #c0202a)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.border = "none";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border-color)";
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".course-prev",
            nextEl: ".course-next",
          }}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 16 },
            480: { slidesPerView: 1.4, spaceBetween: 18 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.4, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Artistic wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10" fill="var(--bg-page)">
          <path d="M0,20 C480,0 960,40 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}

function CourseCard({ course }: any) {
  return (
    <div
      onClick={() => window.open(course.link, "_blank")}
      className="group cursor-pointer h-full py-2"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
        {/* Badge */}
        <div className="absolute top-3 left-3 z-20">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg backdrop-blur-md"
            style={{ backgroundColor: course.badgeColor === "blue" ? "#1a2e6c" : "#c0202a" }}
          >
            {course.badgeColor === "blue" ? (
              <Zap className="w-3 h-3 fill-current" />
            ) : (
              <Flame className="w-3 h-3 fill-current" />
            )}
            {course.badge}
          </div>
        </div>

        {/* Star rating badge */}
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 shadow-md text-xs font-bold text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            4.9
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/25 blur-xl group-hover:left-[120%] transition-all duration-1000" />
        </div>

        {/* Image Container */}
        <div className="h-[280px] sm:h-[300px] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-3">
          <img
            src={course.image}
            alt="Course"
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Bottom Gradient Line */}
        <div
          className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "linear-gradient(90deg, #1a2e6c, #c0202a)" }}
        />
      </div>
    </div>
  );
}
