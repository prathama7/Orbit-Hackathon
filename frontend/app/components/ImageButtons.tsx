export default function ImageButtons() {
    return (
      <div className="absolute top-1/2 left-0 right-0 flex justify-around transform -translate-y-1/2">
        {['Upload Image', 'Scan Image'].map((text) => (
          <button
            key={text}
            className="px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-md shadow-lg transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            {text}
          </button>
        ))}
      </div>
    )
  }
  