import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

import LoginForm from "@/features/auth/components/LoginForm";
import Dashboard from "@/components/admin/Dashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("adminToken")?.value;

  let admin = null;

  if (token) {
    try {
      admin = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {}
  }

  if (!admin) {
    return <LoginForm />;
  }

  // Use raw mysql queries to avoid Prisma 7 client initialization issues
  const [doubtsResult]: any = await db.execute("SELECT COUNT(*) as count FROM ask_doubts");
  const totalDoubts = doubtsResult[0]?.count || 0;

  const [materialsResult]: any = await db.execute("SELECT COUNT(*) as count FROM ArtsLab");
  const studyMaterials = materialsResult[0]?.count || 0;

  const [recentFeedback]: any = await db.execute(
    "SELECT * FROM ArtsLabFeedback ORDER BY createdAt DESC LIMIT 10"
  );

  // Live Visitors (active within the last 5 minutes)
  const [liveVisitorsResult]: any = await db.execute(
    "SELECT COUNT(*) as count FROM VisitorAnalytics WHERE lastActivity >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)"
  );
  const liveVisitors = liveVisitorsResult[0]?.count || 0;

  // Today's Traffic (new sessions created today)
  const [todayTrafficResult]: any = await db.execute(
    "SELECT COUNT(*) as count FROM VisitorAnalytics WHERE DATE(createdAt) = CURDATE()"
  );
  const todaysTraffic = todayTrafficResult[0]?.count || 0;

  return (
    <Dashboard 
      metrics={{ totalDoubts, studyMaterials, liveVisitors, todaysTraffic }} 
      recentFeedback={recentFeedback} 
    />
  );
}
