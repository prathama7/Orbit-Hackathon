interface MiddleButtonProps {
    onClick: () => void
  }
  
  export default function MiddleButton({ onClick }: MiddleButtonProps) {
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      >
        Click me to be safe
      </button>
    )
  }
  
  