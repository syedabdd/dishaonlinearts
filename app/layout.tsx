import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/website/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dishaartsclasses.com"),

  title: {
    default:
      "Disha Arts Classes | Bihar's Best Online Coaching for Class 11 & 12",
    template: "%s | Disha Arts Classes",
  },

  description:
    "Disha Arts Classes is Bihar's leading online coaching platform for Class 11 and 12 Arts students. Get expert guidance in History, Geography, Political Science, NCERT preparation, Bihar Board exams, quizzes, notes, blogs, and doubt support.",

  keywords: [
    "Disha Online Classes",
    "Disha Arts Classes",
    "Bihar Board Arts Coaching",
    "Online Arts Coaching Bihar",
    "Class 10 Arts Bihar Board",
    "Class 9 Arts Bihar Board",
    "Class 11 Arts Coaching",
    "Class 12 Arts Coaching",
    "Online Arts Classes Bihar",
    "History Coaching Bihar",
    "Geography Coaching Bihar",
    "Political Science Coaching Bihar",
    "NCERT Arts Notes",
    "Arts Quiz",
    "Bihar Board Exam Preparation",
  ],
  alternates: {
    canonical: "https://www.dishaartsclasses.com",
  },

  authors: [
    {
      name: "Disha Arts Classes",
      url: "https://www.dishaartsclasses.com",
    },
  ],

  creator: "Disha Arts Classes",
  publisher: "Disha Arts Classes",

  openGraph: {
    title:
      "Disha Arts Classes | Bihar's Best Online Coaching for Class 11 & 12",
    description:
      "Join Bihar's leading online arts coaching platform for Class 11 & 12 students. Expert teachers, notes, quizzes, blogs, and complete Bihar Board preparation.",
    url: "https://www.dishaartsclasses.com",
    siteName: "Disha Arts Classes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Disha Arts Classes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Disha Arts Classes | Bihar's Best Online Coaching for Class 11 & 12",
    description:
      "Expert online coaching for Bihar Board Arts students with notes, quizzes, blogs, and exam preparation.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('disha-theme');

                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (
                    !stored &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                  ) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body className="font-sans antialiased bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://www.dishaartsclasses.com/#organization",
                  "name": "Disha Arts Classes",
                  "url": "https://www.dishaartsclasses.com",
                  "logo": "https://www.dishaartsclasses.com/Logo.PNG",
                  "sameAs": [
                    "https://www.youtube.com/@DishaOnlineClasses",
                    "https://www.facebook.com/dishaonlineclasses"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.dishaartsclasses.com/#localbusiness",
                  "name": "Disha Online Classes",
                  "image": "https://www.dishaartsclasses.com/Logo.PNG",
                  "url": "https://www.dishaartsclasses.com",
                  "telephone": "+917700879453",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Patna",
                    "addressRegion": "Bihar",
                    "addressCountry": "IN"
                  },
                  "priceRange": "$$",
                  "category": "Arts Coaching Institute"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.dishaartsclasses.com/#website",
                  "url": "https://www.dishaartsclasses.com",
                  "name": "Disha Arts Classes",
                  "publisher": {
                    "@id": "https://www.dishaartsclasses.com/#organization"
                  }
                }
              ]
            }),
          }}
        />
        {children}
        <VisitorTracker />
      </body>
    </html>
  );
}
