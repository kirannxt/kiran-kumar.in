import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiran Kumar – Software Engineer & Full Stack Developer",
  description:
    "Software Engineer and Full Stack Developer with 8+ years of experience in Angular, React, .NET, Node.js, Django, REST APIs, GraphQL, SQL Server, MongoDB and Firebase.",
  openGraph: {
    title: "Kiran Kumar – Software Engineer",
    description:
      "8+ years building responsive web applications, AI-powered platforms and full-stack solutions.",
    type: "website",
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
      </head>
      <body style={{ fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
