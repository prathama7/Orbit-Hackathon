'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LogoAnimationProps {
  onAnimationComplete?: () => void
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ onAnimationComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (animationComplete && onAnimationComplete) {
      onAnimationComplete()
    }
  }, [animationComplete, onAnimationComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <motion.h1 
          className="text-6xl font-extrabold text-green-500"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 1.5, type: "spring", stiffness: 50, damping: 10 }}
        >
          ECOMANDU
        </motion.h1>
      </motion.div>
    </div>
  )
}

export default LogoAnimation
