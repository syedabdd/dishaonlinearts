"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateSessionId() {
  return "sess_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Ignore admin and api routes
    if (pathname?.startsWith("/admindp") || pathname?.startsWith("/api")) {
      return;
    }

    let sessionId = sessionStorage.getItem("visitor_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem("visitor_session_id", sessionId);
    }

    const trackVisitor = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    // Track on mount
    trackVisitor();

    // Ping every 4 minutes to keep "live" status active
    const interval = setInterval(() => {
      trackVisitor();
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [pathname]);

  return null; // Silent component
}
