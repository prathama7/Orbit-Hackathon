'use client'

import { useRouter } from 'next/navigation'

export default function DisposalLocations() {
  const router = useRouter()

  const handleClose = () => {
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-green-500 mb-8 text-center">Waste Disposal Locations</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="border-4 border-dotted border-green-500 p-2 rounded-lg mb-6">
            <div className="h-[400px] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">Map placeholder: Waste disposal locations would be shown here</p>
                <p className="text-sm text-gray-500 mt-2">Latitude: 40.7128° N, Longitude: 74.0060° W</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

