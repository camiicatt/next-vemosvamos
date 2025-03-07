"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { MobileMenu } from "./components/mobile-menu"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(circle at 0% 0%, #8b000080 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, #ffc85780 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #2a9d8f80 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, #26465380 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
          backgroundColor: "#ECEBE0",
        }}
      />

      <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
        <div className="container mx-auto px-4 py-20 flex flex-col justify-center items-center mt-10 md:mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-2xl aspect-[4/3] mx-auto"
          >
            {/* Hero Image */}
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/large.jpg"
                alt="Vemos Vamos hero image featuring a heart-shaped candy and vintage postcard design"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="sr-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Vemos Vamos - Your Bilingual Community for Entrepreneurial Success
          </motion.h1>

          <motion.p
            className="mt-8 text-center text-[#8b0000] text-xl md:text-2xl font-medium max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Empowering bilingual entrepreneurs with community and resources.
          </motion.p>
        </div>
      </main>

      <Footer />

      <AnimatePresence>{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}</AnimatePresence>
    </div>
  )
}

