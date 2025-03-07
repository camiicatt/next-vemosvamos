"use client"

import { motion } from "motion/react"
import Link from "next/link"

const MotionLink = motion(Link)

interface NavbarProps {
  onOpenMenu: () => void
}

export function Navbar({ onOpenMenu }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#ECEBE0]/10 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <MotionLink
            href="/"
            className="text-[#8b0000] hover:text-[#a50000] transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-semibold text-xl">Vemos Vamos</span>
          </MotionLink>
          <motion.button
            className="px-4 py-2 bg-[#8b0000] text-white rounded-full hover:bg-[#a50000] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8b0000] focus:ring-offset-2 focus:ring-offset-[#ECEBE0]"
            onClick={onOpenMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Menu
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}

