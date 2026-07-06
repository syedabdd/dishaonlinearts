import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dishaartsclasses.com";

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/ask-doubt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  try {
    // 2. Fetch Dynamic Data
    // Blogs
    const blogs = await prisma.blogs.findMany({
      select: { id: true, created_at: true },
    });

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: blog.created_at || new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // Return all combined
    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
    // Fallback to static routes if database fails
    return staticRoutes;
  }
}
