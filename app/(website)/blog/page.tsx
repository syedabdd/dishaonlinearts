import type { Metadata } from "next";
import Blog from "@/components/website/Blog";

export const metadata: Metadata = {
  title: "Arts Blog | Disha Arts Classes",
  description: "Read the latest articles, study tips, and educational news for Bihar Board Arts Class 11 & 12 students.",
  alternates: {
    canonical: "https://www.dishaonlineartsclasses.com/blog",
  },
};

export default function BlogPage() {
  return <Blog />;
}
