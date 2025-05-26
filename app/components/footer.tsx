"use client"

import { motion } from "framer-motion"

interface FooterProps {
  currentLanguage: "en" | "es"
}

export function Footer({ currentLanguage }: FooterProps) {
  const content = {
    en: {
      copyright: "All rights reserved.",
    },
    es: {
      copyright: "Todos los derechos reservados.",
    },
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full py-4 bg-[#8b0000]/10 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <motion.p
          className="text-center text-[#8b0000] text-sm md:text-base font-medium"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          © {new Date().getFullYear()} Vemos Vamos. {content[currentLanguage].copyright}
        </motion.p>
      </div>
    </motion.footer>
  )
}
