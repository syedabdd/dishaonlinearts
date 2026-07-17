"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Heart,
  Bookmark,
  Printer,
  Link2,
  Check,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

interface SharePanelProps {
  title: string;
  url?: string;
}

export default function SharePanel({ title, url }: SharePanelProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const pageUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  function handleCopyLink() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handlePrint() {
    window.print();
  }

  function handleTwitter() {
    const text = encodeURIComponent(`📚 Quick Revision: ${title}\n`);
    const link = encodeURIComponent(pageUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      "_blank"
    );
  }

  function handleFacebook() {
    const link = encodeURIComponent(pageUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      "_blank"
    );
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({ title, url: pageUrl }).catch(() => {});
    } else {
      setShowShareMenu((v) => !v);
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Like */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => {
          setLiked((v) => !v);
          toast.success(liked ? "Removed from likes" : "Added to likes! ❤️");
        }}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-sm font-medium ${
          liked
            ? "bg-red-50 border-red-200 text-red-600"
            : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
        }`}
        title={liked ? "Unlike" : "Like"}
      >
        <Heart
          size={15}
          className={liked ? "fill-red-500 text-red-500" : ""}
        />
        <span>{liked ? "Liked" : "Like"}</span>
      </motion.button>

      {/* Bookmark */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => {
          setBookmarked((v) => !v);
          toast.success(bookmarked ? "Removed bookmark" : "Bookmarked! 🔖");
        }}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-sm font-medium ${
          bookmarked
            ? "bg-amber-50 border-amber-200 text-amber-700"
            : "bg-white border-gray-200 text-gray-600 hover:border-amber-200 hover:text-amber-600"
        }`}
        title={bookmarked ? "Remove Bookmark" : "Bookmark"}
      >
        <Bookmark
          size={15}
          className={bookmarked ? "fill-amber-500 text-amber-500" : ""}
        />
        <span className="hidden sm:inline">{bookmarked ? "Saved" : "Save"}</span>
      </motion.button>

      {/* Copy Link */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 bg-white transition-all text-sm font-medium"
        title="Copy Link"
      >
        {copied ? (
          <Check size={15} className="text-green-600" />
        ) : (
          <Link2 size={15} />
        )}
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
      </motion.button>

      {/* Share */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-[#1a2e6c]/30 hover:text-[#1a2e6c] bg-white transition-all text-sm font-medium"
          title="Share"
        >
          <Share2 size={15} />
          <span className="hidden sm:inline">Share</span>
        </motion.button>

        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -4 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-20 min-w-36"
            >
              <button
                onClick={handleTwitter}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 w-full transition"
              >
                <ExternalLink size={14} />
                Twitter / X
              </button>
              <button
                onClick={handleFacebook}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 w-full transition"
              >
                <ExternalLink size={14} />
                Facebook
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-full transition"
              >
                <Link2 size={14} />
                Copy Link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-400 bg-white transition-all text-sm font-medium print:hidden"
        title="Print"
      >
        <Printer size={15} />
        <span className="hidden sm:inline">Print</span>
      </motion.button>
    </div>
  );
}
