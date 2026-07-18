import type { Metadata } from "next";
import Blog from "@/components/website/Blog";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Arts Blog | Disha Arts Classes",
  description: "Read the latest articles, study tips, and educational news for Bihar Board Arts Class 11 & 12 students.",
  alternates: {
    canonical: "https://www.dishaonlineartsclasses.com/blog",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0; // Force no-cache on Next.js 15

export default async function BlogPage() {
  let blogs = [];
  try {
    const [rows] = await db.execute("SELECT * FROM blogs ORDER BY created_at DESC");
    blogs = (rows as any[]).map((blog: any) => ({
      ...blog,
      created_at: blog.created_at ? new Date(blog.created_at).toISOString() : null,
      updated_at: blog.updated_at ? new Date(blog.updated_at).toISOString() : null,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs in page:", error);
  }

  return <Blog initialBlogs={blogs} />;
}
