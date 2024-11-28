'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function ScanPage() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        setCapturedImage(imageData)
        setShowConfirmDialog(true)
        stopCamera()
      }
    }
  }, [stopCamera])

  const handleConfirm = useCallback(async () => {
    setIsLoading(true)
    setShowConfirmDialog(false)
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setShowOutput(true)
    setIsLoading(false)
  }, [])

  const handleRetry = useCallback(() => {
    setCapturedImage(null)
    setShowConfirmDialog(false)
    startCamera()
  }, [startCamera])

  const handleReset = useCallback(() => {
    setCapturedImage(null)
    setShowOutput(false)
    setShowConfirmDialog(false)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Scan your Image here</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Camera/Image Capture Section */}
          <div className="space-y-4">
            <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-green-300 overflow-hidden relative">
              {!stream && !capturedImage && (
                <button
                  onClick={startCamera}
                  className="absolute inset-0 flex items-center justify-center bg-green-500 text-white"
                  aria-label="Start Camera"
                >
                  Start Camera
                </button>
              )}
              {stream && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    aria-label="Capture Image"
                  >
                    Capture
                  </button>
                </>
              )}
              {capturedImage && (
                <div className="relative w-full h-full">
                  <Image
                    src={capturedImage}
                    alt="Captured"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Output:</h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
              </div>
            ) : showOutput ? (
              <div className="space-y-4">
                <p className="text-gray-600">Analysis Results:</p>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Sample result data would appear here</p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  Scan Another Image
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Captured image analysis will appear here
              </p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-700 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-green-600">
            <li>Click the Start Camera button to activate your device&apos;s camera</li>
            <li>Position the object in the camera view</li>
            <li>Click the Capture button to take a photo</li>
            <li>Confirm or retry the captured image</li>
            <li>View the analysis results on the right</li>
          </ol>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirm Image</h3>
              <p className="mb-4">Would you like to proceed with this image?</p>
              {capturedImage && (
                <div className="relative w-full aspect-video mb-4">
                  <Image
                    src={capturedImage}
                    alt="Preview"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  Retry
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

