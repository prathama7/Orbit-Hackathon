export default function RectangularButtons() {
    return (
      <div className="absolute top-4 right-4 space-x-4">
        {['Login', 'Sign Up'].map((text) => (
          <button
            key={text}
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            {text}
          </button>
        ))}
      </div>
    )
  }
  
  