"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

const MotionLink = motion(Link)

interface NavbarProps {
  onOpenMenu: () => void
  onLanguageChange?: (language: "en" | "es") => void
}

export function Navbar({ onOpenMenu, onLanguageChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "es">("en")
  const toggleRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<SVGPathElement>(null)
  const enTextRef = useRef<HTMLSpanElement>(null)
  const esTextRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // GSAP animation for language toggle
  useEffect(() => {
    if (!toggleRef.current || !heartRef.current || !enTextRef.current || !esTextRef.current) return

    const heart = heartRef.current
    const enText = enTextRef.current
    const esText = esTextRef.current

    gsap.context(() => {
      if (currentLanguage === "es") {
        // Animate to Spanish with heart theme
        gsap.to(heart, {
          fill: "#8b0000",
          scale: 1.3, // Reduced from 1.2 to prevent clipping
          duration: 0.6,
          ease: "elastic.out(1.2, 0.5)",
        })

        // Pulse animation
        gsap.to(heart, {
          scale: 1.4, // Reduced from 1.3 to prevent clipping
          duration: 0.3,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut",
        })

        gsap.to(enText, {
          y: -30,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out",
        })

        gsap.to(esText, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        })
      } else {
        // Animate to English with heart theme
        gsap.to(heart, {
          fill: "#2a9d8f",
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.5)",
        })

        // Pulse animation
        gsap.to(heart, {
          scale: 1.1,
          duration: 0.3,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut",
        })

        gsap.to(esText, {
          y: 30,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.out",
        })

        gsap.to(enText, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        })
      }
    })
  }, [currentLanguage])

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en"
    setCurrentLanguage(newLanguage)

    // Notify parent component
    if (onLanguageChange) {
      onLanguageChange(newLanguage)
    }

    // Add a fun bounce effect to the entire toggle
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        scale: 1.15,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    // Create heart particles
    createHeartParticles()
  }

  const createHeartParticles = () => {
    if (!toggleRef.current) return

    const container = document.createElement("div")
    container.style.position = "absolute"
    container.style.top = "0"
    container.style.left = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.pointerEvents = "none"
    container.style.zIndex = "50"
    document.body.appendChild(container)

    const colors = ["#8b0000", "#ffc857", "#2a9d8f"]

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div")
      heart.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="${colors[i % colors.length]}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>`
      heart.style.position = "absolute"
      heart.style.left = "50%"
      heart.style.top = "50%"
      heart.style.transform = "translate(-50%, -50%)"
      heart.style.opacity = "0"
      container.appendChild(heart)

      gsap.fromTo(
        heart,
        {
          x: 0,
          y: 0,
          scale: 0.5,
          opacity: 1,
          rotation: 0,
        },
        {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.3, 1),
          opacity: 0,
          rotation: gsap.utils.random(-90, 90),
          duration: gsap.utils.random(1, 2),
          ease: "power2.out",
          onComplete: () => {
            container.removeChild(heart)
            if (container.childNodes.length === 0) {
              document.body.removeChild(container)
            }
          },
        },
      )
    }
  }

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
          <MotionLink
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
          </MotionLink>

          {/* Heart-themed Language Toggle */}
          <motion.div
            ref={toggleRef}
            className="relative flex items-center justify-center cursor-pointer"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Heart SVG */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 drop-shadow-md transition-all duration-300"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
              >
                <path
                  ref={heartRef}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#2a9d8f"
                />
              </svg>

              {/* Language text overlays */}
              <div className="absolute inset-0 flex flex-col items-center justify-center overflow-visible">
                <span
                  ref={enTextRef}
                  className="text-xs font-bold text-white absolute"
                  style={{ opacity: 1, transform: "translateY(0)" }}
                >
                  EN
                </span>
                <span
                  ref={esTextRef}
                  className="text-xs font-bold text-white absolute"
                  style={{ opacity: 0, transform: "translateY(30px)" }}
                >
                  ES
                </span>
              </div>
            </div>

            {/* Decorative elements - positioned further from heart */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffc857] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2a9d8f] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}
