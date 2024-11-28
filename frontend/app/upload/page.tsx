'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'] })

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('') 
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file)
        setError('') 
      } else {
        setError('Please select a valid image file.')
        setSelectedImage(null)
      }
    }
  }

  const handleSubmit = () => {
    if (selectedImage) {
      setOutput('Image processed successfully. Results will be displayed here.')
    }
  }

  const handleContinue = () => {
    router.push('/results') 
  }

  const handleRefresh = () => {
    setSelectedImage(null)
    setOutput('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side */}
      <div className="w-1/2 p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-green-500 mb-8">Upload your Image here</h2>
        <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-lg p-8 mb-8">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Select Image
          </button>
          {selectedImage && (
            <p className="mt-4 text-green-600">{selectedImage.name}</p>
          )}
          {error && (
            <p className="mt-4 text-red-500">{error}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors mb-8"
        >
          Submit
        </button>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-700 mb-2">Instructions:</h3>
        <div className="text-green-600 mb-2"><p>1. Click on the Select Image button to choose an image.</p></div>
        <div className="text-green-600 mb-2">2. Once selected, click Submit to process the image.</div>
        <div className="text-green-600 mb-2">3. View the results on the right side of the screen.</div>
        <div className="text-green-600 mb-2">4. Use Continue to proceed or Refresh to start over.</div>
</div>
      </div>

      

      {}
      <div className="w-1/2 p-8 flex flex-col border-l-2 border-dotted border-green-300">
        <div className={`flex-grow bg-white p-6 rounded-lg shadow-md mb-8 ${firaCode.className} overflow-auto`}>
          <h3 className="text-xl font-semibold text-green-600 mb-4">Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleContinue}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Continue
          </button>
          <button
            onClick={handleRefresh}
            className="bg-white text-green-500 px-6 py-3 rounded-md border border-green-500 hover:bg-green-50 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}



