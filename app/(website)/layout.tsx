import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import NextTopLoader from "nextjs-toploader";
import FloatingCallButton from "@/components/website/FloatingCallButton";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <NextTopLoader color="#c0202a" showSpinner={false} height={3} shadow="0 0 10px #c0202a,0 0 5px #c0202a" />
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <FloatingCallButton />
    </ThemeProvider>
  );
}
