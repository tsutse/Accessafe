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

    // Add ARIA message when panel is opened
    if (isOpen) {
      const ariaLiveRegion = document.getElementById('a11y-status');
      if (ariaLiveRegion) {
        ariaLiveRegion.textContent = 'נפתח פאנל הגדרות נגישות';
        setTimeout(() => {
          if (ariaLiveRegion) ariaLiveRegion.textContent = '';
        }, 1000);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, togglePanel]);

  return (
    <>
      {/* ARIA live region for accessibility announcements */}
      <div id="a11y-status" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      
      {/* Main Widget Container - only contains the button */}
      <div 
        ref={widgetRef}
        className="fixed z-50"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <AccessibilityButton onClick={togglePanel} isOpen={isOpen} />
        <AccessibilityPanel isOpen={isOpen} position={position} />
      </div>
    </>
  );
};

export default AccessibilityWidget;
