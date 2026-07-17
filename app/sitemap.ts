import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dishaartsclasses.com";

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/ask-doubt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/quick-revision`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    // 2. Fetch Dynamic Data — Blogs
    const blogs = await prisma.blogs.findMany({
      select: { id: true, created_at: true },
    });

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: blog.created_at || new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // 3. QuickRevision slugs
    const quickRevisions = await prisma.quickRevision.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const quickRevisionRoutes: MetadataRoute.Sitemap = quickRevisions.map((qr) => ({
      url: `${baseUrl}/quick-revision/${qr.slug}`,
      lastModified: qr.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes, ...quickRevisionRoutes];
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
    return staticRoutes;
  }
}
