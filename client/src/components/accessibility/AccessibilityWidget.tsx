import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '@/lib/AccessibilityContext';
import AccessibilityButton from './AccessibilityButton';
import AccessibilityPanel from './AccessibilityPanel';

interface AccessibilityWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ 
  position = 'bottom-right' 
}) => {
  const { isOpen, togglePanel } = useAccessibility();
  const widgetRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node) && isOpen) {
        togglePanel();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        togglePanel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, togglePanel]);

  const positionClass = {
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5'
  }[position];

  return (
    <div 
      ref={widgetRef}
      className={`fixed z-50 ${positionClass} transition-all duration-300 ease-in-out`}
      data-state={isOpen ? 'open' : 'closed'}
    >
      <AccessibilityButton onClick={togglePanel} isOpen={isOpen} />
      <AccessibilityPanel isOpen={isOpen} position={position} />
    </div>
  );
};

export default AccessibilityWidget;
