"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
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

// Extend HTMLElement to include our custom dataset properties
interface ExtendedHTMLElement extends HTMLElement {
  dataset: DOMStringMap & {
    mouseenterHandler?: string
    mouseleaveHandler?: string
  }
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "es">("en")
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [splitInstances, setSplitInstances] = useState<{
    headline?: SplitText
    subheadline?: SplitText
  }>({})

  // Language content
  const content = {
    en: {
      headline: "Creatively Raw. Curiosity Driven.",
      subheadline: "A bilingual space for those who aren't afraid to question, create, and grow.",
      cta: "Connect With Us",
    },
    es: {
      headline: "Creativamente Auténtico. Impulsado por la Curiosidad.",
      subheadline: "Un espacio bilingüe para aquellos que no temen cuestionar, crear y crecer.",
      cta: "Conecta Con Nosotros",
    },
  }

  const addCharacterHoverEffects = useCallback(
    (chars: HTMLElement[]) => {
      chars.forEach((char) => {
        const extendedChar = char as ExtendedHTMLElement
        gsap.set(char, { transformOrigin: "center bottom" })

        // Remove any existing event listeners to prevent duplicates
        const existingMouseenterHandler = (extendedChar as ExtendedHTMLElement & { _mouseenterHandler?: () => void })
          ._mouseenterHandler
        const existingMouseleaveHandler = (extendedChar as ExtendedHTMLElement & { _mouseleaveHandler?: () => void })
          ._mouseleaveHandler

        if (existingMouseenterHandler) {
          char.removeEventListener("mouseenter", existingMouseenterHandler)
        }
        if (existingMouseleaveHandler) {
          char.removeEventListener("mouseleave", existingMouseleaveHandler)
        }

        const mouseenterHandler = () => {
          gsap.to(char, {
            y: -15,
            color: currentLanguage === "en" ? "#a50000" : "#8b0000",
            scale: 1.2,
            rotation: gsap.utils.random(-10, 10),
            duration: 0.3,
            ease: "back.out(2)",
          })
        }

        const mouseleaveHandler = () => {
          gsap.to(char, {
            y: 0,
            color: "#8b0000",
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        // Store handlers for cleanup
        ;(extendedChar as ExtendedHTMLElement & { _mouseenterHandler?: () => void })._mouseenterHandler =
          mouseenterHandler
        ;(extendedChar as ExtendedHTMLElement & { _mouseleaveHandler?: () => void })._mouseleaveHandler =
          mouseleaveHandler

        char.addEventListener("mouseenter", mouseenterHandler)
        char.addEventListener("mouseleave", mouseleaveHandler)
      })
    },
    [currentLanguage],
  )

  const animateTextEntrance = useCallback(() => {
    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const cta = ctaRef.current

    if (!headline || !subheadline || !cta) return

    gsap.context(() => {
      // Create SplitText instances
      const headlineSplit = new SplitText(headline, { type: "chars,words" })
      const subheadlineSplit = new SplitText(subheadline, { type: "chars,words" })

      setSplitInstances({ headline: headlineSplit, subheadline: subheadlineSplit })

      // Set initial states
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
      addCharacterHoverEffects(headlineSplit.chars as HTMLElement[])
    })
  }, [addCharacterHoverEffects])

  // Initial GSAP setup
  useEffect(() => {
    animateTextEntrance()
  }, [animateTextEntrance])

  // Language change handler
  const handleLanguageChange = (newLang: "en" | "es") => {
    if (newLang === currentLanguage) return

    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const cta = ctaRef.current

    if (!headline || !subheadline || !cta) return

    // Create creative language transition
    gsap.context(() => {
      // Phase 1: Creative exit with heart theme
      const exitTl = gsap.timeline()

      // Headline: Heart beat effect
      if (splitInstances.headline) {
        exitTl.to(splitInstances.headline.chars, {
          scale: (i) => 1 + Math.sin(i * 0.5) * 0.5,
          opacity: 0,
          stagger: {
            each: 0.02,
            from: "center",
          },
          duration: 0.5,
          ease: "power2.in",
        })
      }

      // Subheadline: Fade out with stagger
      if (splitInstances.subheadline) {
        exitTl.to(
          splitInstances.subheadline.chars,
          {
            opacity: 0,
            y: -20,
            stagger: {
              each: 0.01,
              from: "start",
            },
            duration: 0.3,
            ease: "power1.in",
          },
          "-=0.3",
        )
      }

      // CTA: Heartbeat and fade
      exitTl.to(
        cta,
        {
          scale: 1.2,
          duration: 0.15,
          ease: "back.in(1.7)",
        },
        "-=0.2",
      )
      exitTl.to(cta, {
        scale: 0.8,
        duration: 0.15,
        ease: "back.in(1.7)",
      })
      exitTl.to(cta, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "back.in(1.7)",
      })

      // Phase 2: Update content and prepare for entrance
      exitTl.call(() => {
        // Clean up old split instances
        if (splitInstances.headline) splitInstances.headline.revert()
        if (splitInstances.subheadline) splitInstances.subheadline.revert()

        // Update language
        setCurrentLanguage(newLang)

        // Update content
        headline.textContent = content[newLang].headline
        subheadline.textContent = content[newLang].subheadline
        cta.textContent = content[newLang].cta

        // Create new split instances
        const newHeadlineSplit = new SplitText(headline, { type: "chars,words" })
        const newSubheadlineSplit = new SplitText(subheadline, { type: "chars,words" })

        setSplitInstances({ headline: newHeadlineSplit, subheadline: newSubheadlineSplit })

        // Set initial states for entrance
        gsap.set(newHeadlineSplit.chars, {
          autoAlpha: 0,
          scale: 0,
          y: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-45, 45),
        })

        gsap.set(newSubheadlineSplit.chars, {
          autoAlpha: 0,
          y: 30,
        })

        gsap.set(cta, {
          autoAlpha: 0,
          scale: 0,
          rotation: 180,
        })

        // Phase 3: Creative entrance with heart theme
        const entranceTl = gsap.timeline({ delay: 0.2 })

        // Create heart burst effect
        createHeartBurst()

        // Headline: Characters fly in from random positions
        entranceTl.to(newHeadlineSplit.chars, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          stagger: {
            each: 0.03,
            from: "random",
          },
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add hover effects to new characters after animation completes
            addCharacterHoverEffects(newHeadlineSplit.chars as HTMLElement[])
          },
        })

        // Subheadline: Wave effect
        entranceTl.to(
          newSubheadlineSplit.chars,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              each: 0.02,
              from: "start",
            },
            ease: "power2.out",
          },
          "-=0.4",
        )

        // CTA: Heart beat entrance
        entranceTl.set(
          cta,
          {
            autoAlpha: 1,
            scale: 0,
            rotation: 0,
          },
          "-=0.2",
        )
        entranceTl.to(cta, {
          scale: 1.2,
          duration: 0.3,
          ease: "power1.out",
        })
        entranceTl.to(cta, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        })
      })
    })
  }

  const createHeartBurst = () => {
    const container = containerRef.current
    if (!container) return

    const colors = ["#8b0000", "#ffc857", "#2a9d8f"]
    const heartSizes = [30, 40, 50, 60]

    for (let i = 0; i < 12; i++) {
      const heartSize = heartSizes[Math.floor(Math.random() * heartSizes.length)]
      const heart = document.createElement("div")
      heart.innerHTML = `<svg width="${heartSize}" height="${heartSize}" viewBox="0 0 24 24" fill="${colors[i % colors.length]}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>`
      heart.style.position = "absolute"
      heart.style.left = "50%"
      heart.style.top = "50%"
      heart.style.transform = "translate(-50%, -50%)"
      heart.style.opacity = "0"
      heart.style.zIndex = "5"
      heart.style.pointerEvents = "none"
      container.appendChild(heart)

      gsap.fromTo(
        heart,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0.8,
          rotation: 0,
        },
        {
          x: gsap.utils.random(-300, 300),
          y: gsap.utils.random(-200, 200),
          scale: gsap.utils.random(0.5, 1.5),
          opacity: 0,
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(1.5, 3),
          ease: "power2.out",
          onComplete: () => {
            container.removeChild(heart)
          },
        },
      )
    }
  }

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

        <Navbar onOpenMenu={() => setIsMenuOpen(true)} onLanguageChange={handleLanguageChange} />

        <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
          {/* Hero Section with GSAP Text Animations */}
          <div ref={containerRef} className="w-full min-h-screen flex flex-col justify-center items-center px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="">
                <h1
                  ref={headlineRef}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#8b0000] mb-8 leading-tight tracking-tight"
                >
                  {content[currentLanguage].headline}
                </h1>
              </div>

              <div className="overflow-hidden">
                <p
                  ref={subheadlineRef}
                  className="text-xl md:text-2xl lg:text-3xl text-[#264653] mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  {content[currentLanguage].subheadline}
                </p>
              </div>

              <button
                ref={ctaRef}
                className="px-8 py-4 bg-[#8b0000] text-white rounded-full font-medium text-lg md:text-xl hover:bg-[#a50000] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(true)}
              >
                {content[currentLanguage].cta}
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
