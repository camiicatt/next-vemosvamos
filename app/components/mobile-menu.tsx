"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"
import { Newsletter } from "./newsletter"

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [showNewsletter, setShowNewsletter] = useState(false)

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
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
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
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with Logo and Close Button */}
        <div className="flex justify-between items-center p-8">
          <Link href="/" className="text-white hover:text-white/80 transition-colors">
            <span className="sr-only">Vemos Vamos</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </Link>
          <motion.button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="ri-close-line text-3xl" />
          </motion.button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)]">
            {/* Left Section - Navigation */}
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-end">
              <nav className="space-y-6">
                {[
                  { href: "/", label: "HOME", isActive: true },
                  { href: "#work", label: "THE WORK" },
                  { href: "#about", label: "ABOUT US" },
                  { href: "#news", label: "NEWS" },
                  { label: "CONTACT US", onClick: () => setShowNewsletter(true) },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`block text-4xl md:text-5xl font-bold tracking-tight ${
                          item.isActive ? "text-[#8b0000]" : "text-white hover:text-white/80"
                        } transition-colors`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="block text-4xl md:text-5xl font-bold tracking-tight text-white hover:text-white/80 transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right Section - Contact & Social */}
            <div className="flex-none w-full md:w-[400px] p-8 md:p-16 flex flex-col justify-end">
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-white">ADDRESS</h2>
                  <address className="not-italic text-white/80 text-lg leading-relaxed">
                    711 Navarro Street
                    <br />
                    San Antonio, TX 78205
                    <br />
                    USA
                  </address>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-white/80 text-lg">
                    Tel:{" "}
                    <a href="tel:+12108314439" className="hover:text-white transition-colors">
                      +1 (210) 831-4439
                    </a>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-white">SOCIAL</h2>
                  <div className="flex space-x-6">
                    <a
                      href="https://www.instagram.com/vemos.vamos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <i className="ri-instagram-line text-3xl"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/vemosvamos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <i className="ri-linkedin-fill text-3xl"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/vemosvamos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <i className="ri-facebook-fill text-3xl"></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Slide-in */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            className="absolute inset-0 bg-[#EE2D24] z-20 flex flex-col"
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
                <span>MENU</span>
              </button>
              <motion.button
                onClick={() => setShowNewsletter(false)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-close-line text-3xl" />
              </motion.button>
            </div>
            <div className="flex-grow overflow-y-auto flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">CONTACT US</h2>
                <Newsletter />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

