import LoginForm from "@/features/auth/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  // If already logged in, redirect to dashboard
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;
  
  if (token) {
    redirect("/admindp");
  }

  return <LoginForm />;
}
