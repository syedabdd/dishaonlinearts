import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  let admin = null;

  if (token) {
    try {
      admin = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {}
  }

  // If not logged in or invalid token, redirect to the dedicated login page
  if (!admin) {
    redirect("/admin-login");
  }

  return (
    <>
      <NextTopLoader color="#4f46e5" showSpinner={false} shadow="0 0 10px #4f46e5,0 0 5px #4f46e5" />
      <Toaster position="top-right" toastOptions={{ className: 'text-sm font-medium' }} />
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </>
  );
}
