import React from 'react';

interface AccessibilityButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button 
      aria-label="תפריט נגישות"
      className={`
        flex items-center justify-center w-14 h-14 
        bg-gradient-to-br from-blue-600 to-indigo-700 
        text-white rounded-full 
        shadow-lg
        border-2 border-white
        hover:shadow-xl hover:from-blue-700 hover:to-indigo-800
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
        transition-all duration-300
        ${isOpen ? 'rotate-90 scale-110' : 'scale-100'}
      `}
      onClick={onClick}
      style={{ 
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
      }}
    >
      <div className="relative">
        {/* Accessibility icon with subtle animation */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path>
          <path d="M5 10a7 7 0 0 0 7 7"></path>
          <path d="M12 17a7 7 0 0 0 7-7"></path>
          <path d="M12 17v5"></path>
          <line x1="5" y1="10" x2="19" y2="10"></line>
        </svg>
        
        {/* Subtle pulse animation */}
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" 
             style={{animationDuration: '3s', animationIterationCount: 'infinite'}}></div>
      </div>
    </button>
  );
};

export default AccessibilityButton;
