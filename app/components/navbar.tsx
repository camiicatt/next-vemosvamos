"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useState, useEffect } from "react"


interface NavbarProps {
  onOpenMenu: () => void
}

export function Navbar({ onOpenMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#ECEBE0]/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.a
            href="/"
            className="text-[#8b0000] hover:text-[#a50000] transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <span className="font-semibold text-xl">Vemos Vamos</span>
          </motion.a>

          <motion.button
            className="relative overflow-hidden group px-5 py-2.5 rounded-full bg-gradient-to-br from-[#8b0000] to-[#a50000] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onOpenMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 font-medium">Menu</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-tr from-[#a50000] to-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}
