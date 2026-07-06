"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Send, Sparkles, CheckCircle2 } from "lucide-react";

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: any = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function AskDoubt() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("category", formData.category);
      submitData.append("description", formData.description);

      if (file) {
        submitData.append("file", file);
      }

      const res = await fetch("/api/ask-doubt", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        category: "",
        description: "",
      });
      setFile(null);
      setFileName("");

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-28 pb-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

      {/* Success Toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl bg-green-500 px-6 py-4 text-white shadow-2xl"
          >
            <CheckCircle2 size={22} />
            Doubt submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-5xl font-black tracking-tight text-slate-900 md:text-6xl"
          >
            Solve Your Doubts Instantly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-2xl text-lg text-slate-600"
          >
            Get verified solutions from Disha's top-tier arts experts with
            detailed explanations and personalized guidance.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/40 bg-white/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        >
          <motion.form
            variants={containerVariants as any}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Full Name */}
            <motion.div variants={itemVariants as any}>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
              />
            </motion.div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants as any}>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
                />
              </motion.div>

              <motion.div variants={itemVariants as any}>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
                />
              </motion.div>
            </div>

            {/* Category */}
            <motion.div variants={itemVariants as any}>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Doubt Category
              </label>

              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
              >
                <option value="">Select category</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Political Science">Political Science</option>
              </select>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants as any}>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Doubt Description
              </label>

              <textarea
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain your doubt in detail..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
              />
            </motion.div>

            {/* Upload Section */}
            <motion.div
              variants={itemVariants as any}
              whileHover={{
                scale: 1.01,
              }}
              className="rounded-2xl border-2 border-dashed border-indigo-200 bg-linear-to-br from-white to-indigo-50 p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl"
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <motion.label
                  htmlFor="file-upload"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-100 px-5 py-3 font-semibold text-indigo-700 transition-colors hover:bg-indigo-200"
                >
                  <Paperclip size={18} />
                  Upload Reference
                </motion.label>

                <span className="text-sm font-medium text-slate-500">
                  {fileName || "No file selected (JPG, PNG, PDF)"}
                </span>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={itemVariants as any}
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              disabled={isSubmitting}
              className="group relative cursor-pointer flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:shadow-purple-300/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <Sparkles size={18} />
              {isSubmitting ? "Sending..." : "Send to Experts"}
              <Send size={18} />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
