'use client'

import { useState } from 'react'
import CircleButton from './components/Circlebutton'
import RectangularButtons from './components/RectangularButton'
import MiddleButton from './components/MiddleButton'
import ImageButtons from './components/ImageButtons'
import LogoAnimation from './components/LogoAnimation'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [showImageButtons, setShowImageButtons] = useState(false)

  const handleAnimationComplete = () => {
    setShowContent(true)
  }

  const handleMiddleButtonClick = () => {
    setShowImageButtons(true)
  }

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      {!showContent && <LogoAnimation onAnimationComplete={handleAnimationComplete} />}
      {showContent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-green-500 mb-4">ECOMANDU</h1>
            <p className="text-xl text-gray-600">Making recycling easier, one scan at a time.</p>
          </div>
          <CircleButton />
          <RectangularButtons />
          {!showImageButtons && (
            <MiddleButton onClick={handleMiddleButtonClick} />
          )}
          {showImageButtons && <ImageButtons />}
        </div>
      )}
    </main>
  )
}

