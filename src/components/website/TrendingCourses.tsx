"use client";

import React, { useRef } from "react";
import { Flame, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

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
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-current" />
              Most Enrolled
            </div>

            <h2
              className="mt-5 text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Explore Our{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Trending Courses
              </span>
            </h2>

            <div
              className="w-40 h-1.5 rounded-full mt-4"
              style={{ background: "linear-gradient(90deg, #1a2e6c, #c0202a)" }}
            />

            <p
              className="text-lg max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Unlock your potential with Bihar's top-rated expert faculties.
            </p>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-4">
            <button
              ref={prevRef}
              className="course-prev w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#1a2e6c";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--bg-card)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)";
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              ref={nextRef}
              className="course-next w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#1a2e6c";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--bg-card)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)";
              }}
            >
              <ChevronRight size={24} />
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
            320: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1.4,
              spaceBetween: 18,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.4,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
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
      <div className="relative overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold shadow-xl backdrop-blur-md`}
            style={{
              backgroundColor:
                course.badgeColor === "blue" ? "#1a2e6c" : "#c0202a",
            }}
          >
            {course.badgeColor === "blue" ? (
              <Zap className="w-3 h-3 fill-current" />
            ) : (
              <Flame className="w-3 h-3 fill-current" />
            )}

            {course.badge}
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/30 blur-xl group-hover:left-[120%] transition-all duration-1000" />
        </div>

        {/* Image Container */}
        <div className="h-[320px] sm:h-[340px] bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-3">
          <img
            src={course.image}
            alt="Course"
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Bottom Gradient Line */}
        <div
          className="h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "linear-gradient(90deg, #1a2e6c, #c0202a)" }}
        />

        {/* Hover Border */}
        <div
          className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/40 transition-all duration-500"
          style={{ borderColor: undefined }}
        />
      </div>
    </div>
  );
}
