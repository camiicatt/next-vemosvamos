"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"
import { Newsletter } from "./newsletter"

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const socialLinks = [
    {
      name: "Instagram",
      icon: "ri-instagram-line",
      url: "https://www.instagram.com/vemos.vamos/",
      color: "#E1306C",
    },
    {
      name: "LinkedIn",
      icon: "ri-linkedin-fill",
      url: "https://www.linkedin.com/company/vemosvamos/",
      color: "#0077B5",
    },
    {
      name: "Facebook",
      icon: "ri-facebook-fill",
      url: "https://www.facebook.com/vemosvamos",
      color: "#1877F2",
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 flex flex-col overflow-hidden z-[60]"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      style={{
        background: `
          radial-gradient(circle at 0% 0%, #8b000080 0%, transparent 50%),
          radial-gradient(circle at 100% 0%, #ffc85780 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, #2a9d8f80 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, #26465380 0%, transparent 50%)
        `,
        backgroundColor: "#1A1A1A",
        backgroundSize: "200% 200%",
      }}
    >
      {/* Interactive background gradient */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 0, 0, 0.3) 0%, rgba(26, 26, 26, 0) 50%)`,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with Logo and Close Button */}
        <div className="flex justify-between items-center p-8">
          <Link href="/" onClick={onClose} className="text-white hover:text-white/80 transition-colors">
            <span className="sr-only">Vemos Vamos</span>
            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          </Link>
          <motion.button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="ri-close-line text-3xl" />
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side - Contact Us Button */}
              <motion.div
                className="flex flex-col justify-center items-center md:items-start space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h2
                  className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Let&apos;s Connect
                </motion.h2>

                <motion.button
                  onClick={() => setShowNewsletter(true)}
                  className="group relative overflow-hidden mt-8 px-8 py-4 bg-white text-[#8b0000] rounded-full font-bold text-xl md:text-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 group-hover:text-[#8b0000] transition-colors duration-300">
                    CONTACT US
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#8b0000] to-[#a50000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  />
                </motion.button>
              </motion.div>

              {/* Right Side - Social Links */}
              <motion.div
                className="flex flex-col justify-center items-center md:items-start space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  FOLLOW US
                </motion.h2>

                <div className="flex flex-col space-y-6 w-full">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 text-white/80 hover:text-white transition-colors"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10"
                        whileHover={{
                          scale: 1.2,
                          backgroundColor: link.color,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <i className={`${link.icon} text-2xl`}></i>
                      </motion.div>
                      <span className="text-xl font-medium">{link.name}</span>
                      <motion.i
                        className="ri-arrow-right-line text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#8b0000]/20 to-[#ffc857]/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-[#2a9d8f]/20 to-[#264653]/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Newsletter Slide-in */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#8b0000] to-[#EE2D24] z-20 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-8">
              <button
                onClick={() => setShowNewsletter(false)}
                className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 text-lg"
              >
                <i className="ri-arrow-left-line text-2xl" />
                <span>BACK</span>
              </button>
              <motion.button
                onClick={() => setShowNewsletter(false)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-close-line text-3xl" />
              </motion.button>
            </div>

            <div className="flex-grow overflow-y-auto flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">GET IN TOUCH</h2>
                  <p className="text-white/80 mb-8 text-lg">
                    We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you soon.
                  </p>
                </motion.div>
                <Newsletter />
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
