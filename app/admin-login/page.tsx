import LoginForm from "@/features/auth/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminLoginPage() {
  // Only redirect if token is present AND valid — prevents infinite redirect loop
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      redirect("/admindp"); // Only redirect on valid token
    } catch {
      // Token expired or invalid — show login form (cookie will be cleared on next login)
    }
  }

  return <LoginForm />;
}
