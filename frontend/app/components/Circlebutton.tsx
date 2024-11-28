'use client'

import { useState } from 'react'

export default function CircleButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        aria-label="Open menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 w-56 bg-white rounded-md shadow-xl absolute left-0 top-full">
          <div className="py-1">
            {['Home', 'About Us', 'Contact Us', 'Blog'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="border-t border-gray-100"></div>
          <div className="py-1">
            {['Profile', 'Settings'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

