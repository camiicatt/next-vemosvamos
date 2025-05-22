"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { MobileMenu } from "./components/mobile-menu"
import Head from "next/head"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  // Handle video loading and playback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      console.log("Video loaded data")
      setIsVideoLoaded(true)
      playVideo()
    }

    const handlePlaying = () => {
      console.log("Video is playing")
      setIsPlaying(true)
    }

    const handlePause = () => {
      console.log("Video paused")
      setIsPlaying(false)
    }

    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setIsVideoError(true)
      setIsVideoLoaded(false)
    }

    const playVideo = () => {
      console.log("Attempting to play video")
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playback started successfully")
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Auto-play was prevented:", error)
            setIsPlaying(false)
            // We'll show a play button that the user can click
          })
      }
    }

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)

    // Force reload the video to ensure it loads properly
    video.load()

    return () => {
      // Clean up event listeners
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
    }
  }, [])

  // Manual play function for user interaction
  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Play failed:", err))
    } else {
      video.pause()
      setIsPlaying(false)
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

        <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

        <main className="relative z-10 flex-grow flex flex-col justify-center items-center">
          <div ref={containerRef} className="w-full min-h-screen flex flex-col justify-center items-center">
            <motion.div
              className="w-full max-w-7xl mx-auto px-4 py-20 flex flex-col justify-center items-center"
              style={{ opacity, scale }}
            >
              {/* Video Hero Section */}
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl bg-black">
                {/* Loading state */}
                {!isVideoLoaded && !isVideoError && (
                  <motion.div
                    className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center z-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isVideoLoaded ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-16 h-16 border-4 border-t-[#8b0000] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                )}

                {/* Error state */}
                {isVideoError && (
                  <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center z-10 p-8 text-center">
                    <svg
                      className="w-16 h-16 text-[#8b0000] mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <h3 className="text-white text-xl font-bold mb-2">Video playback error</h3>
                    <p className="text-white/70">We&apos;re having trouble playing this video. Please try again later.</p>
                    <button
                      onClick={() => {
                        setIsVideoError(false)
                        if (videoRef.current) {
                          videoRef.current.load()
                        }
                      }}
                      className="mt-4 px-6 py-2 bg-[#8b0000] text-white rounded-full hover:bg-[#a50000] transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Video with poster */}
                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="https://ampd-asset.s3.us-east-2.amazonaws.com/vv-poster.png"
                    playsInline
                    loop
                    muted
                    preload="auto"
                    aria-label="Vemos Vamos promotional video"
                  >
                    <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/VV+Web+Banner+2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Overlay gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                  {/* Play button overlay (shown when video is not playing) */}
                  {!isPlaying && isVideoLoaded && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={togglePlayPause}
                    >
                      <motion.div
                        className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Additional content section that appears as user scrolls */}
          <div className="w-full bg-[#ECEBE0] py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#8b0000] mb-6">
                  Creatively Raw. Curiosity Driven.
                </h2>
                <p className="text-xl text-[#264653] mb-8">
                  A bilingual space for those who aren&apos;t afraid to question, create, and grow.
                </p>
                <motion.button
                  className="px-8 py-3 bg-[#8b0000] text-white rounded-full font-medium text-lg hover:bg-[#a50000] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(true)}
                >
                  Connect With Us
                </motion.button>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />

        <AnimatePresence>{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}</AnimatePresence>
      </div>
    </>
  )
}
