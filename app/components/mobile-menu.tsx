"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import "remixicon/fonts/remixicon.css"
import { Newsletter } from "./newsletter"

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
        <div className="flex justify-between items-center p-4 md:p-6">
          <Link href="/" onClick={onClose} className="text-white hover:text-white/80 transition-colors">
            <span className="sr-only">Vemos Vamos</span>
            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 md:w-10 md:h-10"
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
            <i className="ri-close-line text-2xl md:text-3xl" />
          </motion.button>
        </div>

        {/* Main Content - Centered Layout with Enhanced Separation */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center">
            {/* Video Section */}
            <motion.div
              className="w-full md:w-[500px] h-[30vh] md:h-[350px] flex-shrink-0 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl bg-black">
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
                      className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                )}

                {/* Error state */}
                {isVideoError && (
                  <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center z-10 p-4 text-center">
                    <svg className="w-12 h-12 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <h3 className="text-white text-lg font-bold mb-1">Video error</h3>
                    <button
                      onClick={() => {
                        setIsVideoError(false)
                        if (videoRef.current) {
                          videoRef.current.load()
                        }
                      }}
                      className="mt-2 px-4 py-1 bg-white text-[#8b0000] rounded-full hover:bg-white/90 transition-colors text-sm"
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
                </motion.div>
              </div>

              {/* Video frame decoration */}
              <motion.div
                className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#8b0000] rounded-xl z-[-1]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </motion.div>

            {/* Visual separator for mobile */}
            <div className="md:hidden w-full my-4 flex items-center justify-center">
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-3/4"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </div>

            {/* Visual separator for desktop */}
            <div className="hidden md:block mx-8">
              <motion.div
                className="h-[200px] w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </div>

            {/* Contact and Social Section */}
            <div className="w-full md:w-auto flex flex-col justify-center space-y-8 md:pl-4">
              {/* Contact Us Button */}
              <motion.div
                className="flex flex-col items-center md:items-start space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Let's Connect
                </motion.h2>

                <motion.button
                  onClick={() => setShowNewsletter(true)}
                  className="group relative overflow-hidden px-6 py-3 bg-white text-[#8b0000] rounded-full font-bold text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 group-hover:text-[#a50000] transition-colors duration-300">
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

              {/* Social Links */}
              <motion.div
                className="flex flex-col items-center md:items-start space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  FOLLOW US
                </motion.h2>

                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center text-white/80 hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"
                        whileHover={{
                          scale: 1.2,
                          backgroundColor: link.color,
                          boxShadow: `0 0 15px ${link.color}80`,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <i className={`${link.icon} text-2xl`}></i>
                      </motion.div>
                      <span className="text-sm font-medium mt-1">{link.name}</span>
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
            <div className="flex justify-between items-center p-4 md:p-6">
              <button
                onClick={() => setShowNewsletter(false)}
                className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 text-lg"
              >
                <i className="ri-arrow-left-line text-xl md:text-2xl" />
                <span>BACK</span>
              </button>
              <motion.button
                onClick={() => setShowNewsletter(false)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-close-line text-2xl md:text-3xl" />
              </motion.button>
            </div>

            <div className="flex-grow flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-md">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">GET IN TOUCH</h2>
                  <p className="text-white/80 mb-6 text-base md:text-lg">
                    We'd love to hear from you. Fill out the form below and we'll get back to you soon.
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
