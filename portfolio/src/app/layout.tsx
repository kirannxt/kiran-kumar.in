import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kiran-kumar.in"),
  title: "Kiran Kumar – Software Engineer & Full Stack Developer | kiran-kumar.in",
  description:
    "Official website and portfolio of Kiran Kumar. Software Engineer and Full Stack Developer with 8+ years of experience in Angular, React, .NET, Node.js, Django, REST APIs, GraphQL, SQL Server, MongoDB and Firebase.",
  keywords: [
    "Kiran Kumar",
    "kiran-kumar.in",
    "www.kiran-kumar.in",
    "Kiran Kumar Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Web Developer",
    "kirannxt"
  ],
  authors: [{ name: "Kiran Kumar", url: "https://kiran-kumar.in" }],
  creator: "Kiran Kumar",
  publisher: "Kiran Kumar",
  alternates: {
    canonical: "https://kiran-kumar.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kiran Kumar – Software Engineer & Full Stack Developer",
    description:
      "Official website and portfolio of Kiran Kumar (kiran-kumar.in). 8+ years building responsive web applications, AI-powered platforms and full-stack solutions.",
    url: "https://kiran-kumar.in",
    siteName: "Kiran Kumar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran Kumar – Software Engineer & Full Stack Developer",
    description:
      "Official website and portfolio of Kiran Kumar (kiran-kumar.in).",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://kiran-kumar.in/#website",
                  "url": "https://kiran-kumar.in",
                  "name": "Kiran Kumar",
                  "alternateName": ["www.kiran-kumar.in", "kiran-kumar.in"],
                  "description":
                    "Official portfolio of Kiran Kumar, Software Engineer & Full Stack Developer.",
                },
                {
                  "@type": "Person",
                  "@id": "https://kiran-kumar.in/#person",
                  "name": "Kiran Kumar",
                  "url": "https://kiran-kumar.in",
                  "jobTitle": "Software Engineer & Full Stack Developer",
                  "sameAs": ["https://github.com/kirannxt"],
                },
              ],
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif" }}>
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PL2N8TQ6"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
