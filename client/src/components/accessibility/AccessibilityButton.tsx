import React from 'react';

interface AccessibilityButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button 
      aria-label="תפריט נגישות"
      className={`flex items-center justify-center w-14 h-14 bg-a11y-dark text-white rounded-full shadow-lg hover:bg-a11y-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-2xl"
      >
        <path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path>
        <path d="M5 10a7 7 0 0 0 7 7"></path>
        <path d="M12 17a7 7 0 0 0 7-7"></path>
        <path d="M12 17v5"></path>
        <line x1="5" y1="10" x2="19" y2="10"></line>
      </svg>
    </button>
  );
};

export default AccessibilityButton;
