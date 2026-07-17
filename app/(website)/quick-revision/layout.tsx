import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | QuickRevision — Disha Arts Classes",
    default: "QuickRevision — 30 Second Revision | Disha Arts Classes",
  },
  description:
    "Revise every important Arts topic in just 30 seconds. QuickRevision by Disha Arts Classes — History, Geography, Political Science, Economics & more.",
  openGraph: {
    siteName: "Disha Arts Classes",
    type: "website",
  },
};

export default function QuickRevisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
