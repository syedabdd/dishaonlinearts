"use client";

import React from "react";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavbar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full min-h-screen pt-16">
        {children}
      </main>
    </div>
  );
}
