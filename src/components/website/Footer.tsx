"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  HelpCircle,
  Mail,
  Phone,
  ArrowRight,
  ChevronUp,
  BookOpen,
  Users,
  Star,
  Zap,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Social Icons ── */
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
);
const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const TelegramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

/* ── Animated Link Item ── */
function FooterLink({
  href,
  label,
  isExternal = false,
}: {
  href: string;
  label: string;
  isExternal?: boolean;
}) {
  return (
    <motion.li
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 text-sm py-0.5"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150"
            style={{ backgroundColor: "#c0202a" }}
          />
          <span className="relative">
            {label}
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: "#c0202a" }}
            />
          </span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity ml-auto shrink-0" />
        </a>
      ) : (
        <Link
          href={href}
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 text-sm py-0.5"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150"
            style={{ backgroundColor: "#c0202a" }}
          />
          <span className="relative">
            {label}
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: "#c0202a" }}
            />
          </span>
        </Link>
      )}
    </motion.li>
  );
}

/* ── Section Heading ── */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-white font-bold text-base uppercase tracking-widest mb-6 flex items-center gap-3">
      <span
        className="inline-block h-5 w-1 rounded-full shrink-0"
        style={{ background: "linear-gradient(180deg, #1a2e6c, #c0202a)" }}
      />
      {children}
    </h4>
  );
}

/* ── Stat Pill ── */
function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-300 group cursor-default"
      style={{
        backgroundColor: "rgba(26,46,108,0.30)",
        borderColor: "rgba(192,32,42,0.20)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(192,32,42,0.60)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(26,46,108,0.50)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(192,32,42,0.20)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(26,46,108,0.30)";
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg, #1a2e6c, #c0202a)" }}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-white font-bold text-sm leading-none">{value}</p>
        <p className="text-slate-400 text-xs mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { Icon: FacebookIcon, label: "Facebook", url: "#", color: "#1877f2" },
    { Icon: InstagramIcon, label: "Instagram", url: "#", color: "#e4405f" },
    {
      Icon: YoutubeIcon,
      label: "YouTube",
      url: "https://www.youtube.com/@DishaArtsClasses",
      color: "#ff0000",
    },
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      url: "https://www.whatsapp.com/channel/0029VaMWhmq9MF92cFlYHL1F",
      color: "#25d366",
    },
    {
      Icon: TelegramIcon,
      label: "Telegram",
      url: "https://t.me/dishaartsclasses",
      color: "#229ed9",
    },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/ask-doubt", label: "Ask Doubt" },
    {
      href: "https://dishaonlineclasses.com/course.php",
      label: "Courses",
      target: "_blank",
    },
    {
      href: "https://dishaonlineclasses.com/study-materials.php",
      label: "Study Material",
    },
  ];

  const examLinks = [
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "BSEB Class 12th Course",
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "BSEB Class 11th Course",
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "BSEB Class 10th Course",
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "BSEB Class 9th Course",
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "UP Board Courses",
    },
    {
      href: "https://play.google.com/store/apps/details?id=co.dishaonlineclasses",
      label: "CBSE Board Courses",
    },
  ];

  const resourceLinks = [
    {
      href: "https://dishaonlineclasses.com/study-materials.php",
      label: "Study Materials",
      isExternal: true,
    },
    {
      href: "https://dishaonlineclasses.com/quiz_home.php",
      label: "Daily Live Quiz",
      isExternal: true,
    },
    {
      href: "https://dishaonlineclasses.com/free-library.php",
      label: "Free Video Library",
      isExternal: true,
    },
    { href: "#", label: "Spoken English Module" },
  ];

  const containerVariants: any = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants: any = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#06091a" }}
    >
      {/* ── Animated Background Glow ── */}
      <div
        className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26,46,108,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(192,32,42,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Top Divider Bar ── */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #1a2e6c 0%, #c0202a 50%, #1a2e6c 100%)",
        }}
      />

      {/* ── CTA Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          backgroundColor: "rgba(26,46,108,0.15)",
        }}
      >
        <div className="max-w-7xl text-gray-200 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white text-xl font-extrabold tracking-tight">
                Ready to start your journey?
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Join 50,000+ students who are already learning with Disha Online
                Classes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <motion.a
                href="tel:+917700879453"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden flex items-center justify-center px-6 py-3 rounded-full text-white font-bold text-sm shadow-lg transition-shadow duration-300"
                style={{
                  background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                  boxShadow: "0 4px 20px rgba(26,46,108,0.40)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4" />
                  Call Now
                </span>
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: "linear-gradient(135deg, #2f4fb8, #e0252e)",
                  }}
                />
              </motion.a>
              <motion.a
                href="mailto:support@dishaonlineclasses.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm border transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.20)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "#c0202a")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.20)")
                }
              >
                <Mail className="w-4 h-4" />
                Email Us
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Footer Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-14"
        >
          {/* ── Column 1: Brand ── */}
          <motion.div
            variants={itemVariants as any}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 shrink-0 flex items-center justify-center"
              >
                <Image
                  src="/Logo.PNG"
                  alt="Disha Online Classes"
                  className="w-full h-full object-contain drop-shadow-[0_4px_20px_rgba(192,32,42,0.40)]"
                  width={64}
                  height={64}
                  unoptimized={true}
                />
              </motion.div>
              <div>
                <p className="text-white font-extrabold text-base leading-tight">
                  Disha Arts Classes
                </p>
                <p className="text-slate-400 ml-2 text-[11px] tracking-widest uppercase mt-0.5">
                  Direction to Success
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Bihar's most trusted digital learning platform. Empowering
              students with quality education since 2018.
            </p>

            {/* Stats Grid */}
            <div className="grid text-gray-200 grid-cols-2 gap-2.5 mb-6">
              <StatPill icon={Users} label="Active Students" value="50,000+" />
              <StatPill icon={Star} label="Success Rate" value="95%" />
              <StatPill icon={BookOpen} label="Video Lessons" value="3,500+" />
              <StatPill icon={Zap} label="Toppers Made" value="500+" />
            </div>

            {/* Contact Details */}
            <div className="space-y-3 text-gray-200 mb-6">
              <motion.a
                href="https://wa.me/917700879453"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group text-sm"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "rgba(37,211,102,0.15)" }}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
                </div>
                +91 7700879453
              </motion.a>
              <motion.a
                href="mailto:support@dishaonlineclasses.com"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group text-sm"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "rgba(192,32,42,0.25)" }}
                >
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                </div>
                <span className="truncate">support@dishaonlineclasses.com</span>
              </motion.a>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-slate-300 text-sm"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(192,32,42,0.25)" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                </div>
                Bihar, India
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.18, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white border transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      s.color + "28";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      s.color + "80";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  <s.Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Column 2: Company ── */}
          <motion.div variants={itemVariants as any}>
            <FooterHeading>Company</FooterHeading>
            <ul className="text-gray-200 space-y-3">
              {companyLinks.map((l) => (
                <FooterLink key={l.label} href={l.href} label={l.label} />
              ))}
            </ul>

            {/* Ask Doubt CTA */}
            <Link href="/ask-doubt" className="block mt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl border cursor-pointer transition-all duration-300 group"
                style={{
                  backgroundColor: "rgba(26,46,108,0.25)",
                  borderColor: "rgba(26,46,108,0.40)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#c0202a";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(192,32,42,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(26,46,108,0.40)";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(26,46,108,0.25)";
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                    }}
                  >
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Got a doubt?
                    </p>
                    <div className="text-red-400 text-xs font-medium flex items-center gap-1 mt-1 group-hover:text-red-300 transition-colors">
                      Ask your doubt now
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* ── Column 3: Popular Exams ── */}
          <motion.div variants={itemVariants as any}>
            <FooterHeading>Popular Exams</FooterHeading>
            <ul className="text-gray-200 space-y-3">
              {examLinks.map((l) => (
                <FooterLink key={l.label} href={l.href} label={l.label} />
              ))}
            </ul>
          </motion.div>

          {/* ── Column 4: Resources ── */}
          <motion.div variants={itemVariants as any}>
            <FooterHeading>Resources</FooterHeading>
            <ul className=" text-gray-200 space-y-3">
              {resourceLinks.map((l) => (
                <FooterLink
                  key={l.label}
                  href={l.href}
                  label={l.label}
                  isExternal={l.isExternal}
                />
              ))}
            </ul>

            {/* Newsletter / App Download teaser */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-4 rounded-2xl border text-center transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26,46,108,0.35), rgba(192,32,42,0.15))",
                borderColor: "rgba(192,32,42,0.25)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(192,32,42,0.60)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(192,32,42,0.25)")
              }
            >
              <p className="text-white font-bold text-sm mb-1">
                📱 Download Disha App
              </p>
              <p className="text-slate-400 text-xs mb-3">
                Access all courses on the go
              </p>
              <motion.a
                href="https://play.google.com/store/apps/details?id=co.dishaonlineclasses"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white! text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
                }}
              >
                Get the App
                <ArrowRight className="w-3 h-3" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 pt-6 border-t mx-auto"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-slate-500 text-xs md:text-s  text-center">
            Copyright © {new Date().getFullYear()} Sanjay Kumar's Educational
            Classes Private Limited All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* ── Scroll to Top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full text-white shadow-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1a2e6c, #c0202a)",
              boxShadow: "0 4px 20px rgba(192,32,42,0.50)",
            }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
