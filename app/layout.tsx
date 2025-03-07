import type React from "react"
import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import { GoogleTagManager } from '@next/third-parties/google'
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vemos Vamos - Your Bilingual Community for Entrepreneurial Success",
  description: "Vemos Vamos is a bilingual platform fostering entrepreneurial success through community, resources, and innovative solutions.",
  keywords: "Vemos Vamos, bilingual, entrepreneurship, community, success, innovation",
  openGraph: {
    title: "Vemos Vamos - Bilingual Entrepreneurial Community",
    description: "Join Vemos Vamos for bilingual resources and community support in your entrepreneurial journey.",
    url: "https://www.vemosvamos.com",
    siteName: "Vemos Vamos",
    images: [
      {
        url: "https://www.vemosvamos.com/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vemos Vamos - Bilingual Entrepreneurial Success",
    description: "Vemos Vamos is a bilingual platform fostering entrepreneurial success through community, resources, and innovative solutions.",
    images: ["https://www.vemosvamos.com/opengraph-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <GoogleTagManager gtmId="G-END50N2KZ9" />
      <body className="font-sans bg-vvBackground text-vvText antialiased">{children}</body>
    </html>
  )
}

