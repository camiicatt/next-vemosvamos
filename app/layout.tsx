import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "remixicon/fonts/remixicon.css"
import Script from "next/script"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vemosvamos.com"),
  title: {
    default: "Vemos Vamos - Your Bilingual Community for Entrepreneurial Success",
    template: "%s | Vemos Vamos",
  },
  description:
    "Vemos Vamos is a bilingual platform fostering entrepreneurial success through community, resources, and innovative solutions.",
  keywords: [
    "Vemos Vamos",
    "bilingual",
    "entrepreneurship",
    "community",
    "success",
    "innovation",
    "Spanish",
    "English",
  ],
  authors: [{ name: "Vemos Vamos Team" }],
  creator: "Vemos Vamos",
  publisher: "Vemos Vamos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vemos Vamos - Bilingual Entrepreneurial Community",
    description: "Join Vemos Vamos for bilingual resources and community support in your entrepreneurial journey.",
    url: "https://www.vemosvamos.com",
    siteName: "Vemos Vamos",
    images: [
      {
        url: "https://www.vemosvamos.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vemos Vamos - Bilingual Entrepreneurial Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vemos Vamos - Bilingual Entrepreneurial Success",
    description: "Empowering bilingual entrepreneurs with community and resources.",
    images: ["https://www.vemosvamos.com/twitter-image.jpg"],
    creator: "@vemosvamos",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-vvBackground text-vvText antialiased">
        {children}

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-V4H0TMWFEC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V4H0TMWFEC');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1345149799924014');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1345149799924014&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </body>
    </html>
  )
}
