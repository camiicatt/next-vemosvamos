"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { MobileMenu } from "./components/mobile-menu"
import Head from "next/head"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin, SplitText)
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Set up GSAP animations
  useEffect(() => {
    // Mark as loaded to prevent animation flashes
    setIsLoaded(true)

    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const cta = ctaRef.current

    if (!headline || !subheadline || !cta) return

    // Clear any existing animations
    gsap.context(() => {
      // Create SplitText instances
      const headlineSplit = new SplitText(headline, { type: "chars,words" })
      const subheadlineSplit = new SplitText(subheadline, { type: "chars,words" })

      // Set initial states - but don't hide the elements completely
      gsap.set([headlineSplit.chars, subheadlineSplit.chars, cta], {
        autoAlpha: 0,
        y: 50,
      })

      // Create the main timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Headline animation
      tl.fromTo(
        headlineSplit.chars,
        {
          y: 50,
          rotation: 15,
          autoAlpha: 0,
        },
        {
          duration: 1.2,
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          stagger: 0.03,
          ease: "back.out(1.7)",
        },
      )

      // Subheadline animation
      tl.fromTo(
        subheadlineSplit.chars,
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          duration: 0.8,
          y: 0,
          autoAlpha: 1,
          stagger: 0.01,
          ease: "power2.out",
        },
        "-=0.8",
      )

      // CTA button animation
      tl.fromTo(
        cta,
        {
          y: 30,
          autoAlpha: 0,
          scale: 0.9,
        },
        {
          duration: 0.8,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.4",
      )

      // Add hover effects for each character in the headline
      headlineSplit.chars.forEach((char) => {
        gsap.set(char, { transformOrigin: "center bottom" })

        char.addEventListener("mouseenter", () => {
          gsap.to(char, {
            y: -15,
            color: "#a50000",
            scale: 1.2,
            rotation: gsap.utils.random(-10, 10),
            duration: 0.3,
            ease: "back.out(2)",
          })
        })

        char.addEventListener("mouseleave", () => {
          gsap.to(char, {
            y: 0,
            color: "#8b0000",
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    })

    // Cleanup function
    return () => {
      gsap.killTweensOf([headline, subheadline, cta])
    }
  }, [])

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Vemos Vamos",
            url: "https://www.vemosvamos.com",
            logo: "https://www.vemosvamos.com/logo.png",
            sameAs: [
              "https://www.instagram.com/vemos.vamos/",
              "https://www.linkedin.com/company/vemosvamos/",
              "https://www.facebook.com/vemosvamos",
            ],
            description:
              "Vemos Vamos is a bilingual platform fostering entrepreneurial success through community, resources, and innovative solutions.",
          })}
        </script>
      </Head>
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

        <main className="relative z-10 flex-grow flex flex-col justify-center items-center md:mt-16">
          {/* Hero Section with GSAP Text Animations */}
          <div ref={containerRef} className="w-full min-h-screen flex flex-col justify-center items-center px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="">
                <h1
                  ref={headlineRef}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#8b0000] mb-8 leading-tight tracking-tight"
                >
                  Creatively Raw. Curiosity Driven.
                </h1>
              </div>

              <div className="overflow-hidden">
                <p
                  ref={subheadlineRef}
                  className="text-xl md:text-2xl lg:text-3xl text-[#264653] mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  A bilingual space for those who aren't afraid to question, create, and grow.
                </p>
              </div>

              <button
                ref={ctaRef}
                className="px-8 py-4 bg-[#8b0000] text-white rounded-full font-medium text-lg md:text-xl hover:bg-[#a50000] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(true)}
              >
                Connect With Us
              </button>
            </div>
          </div>
        </main>

        <Footer />

        <AnimatePresence>{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}</AnimatePresence>
      </div>
    </>
  )
}
