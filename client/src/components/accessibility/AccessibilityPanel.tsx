import React, { useEffect, useState } from 'react';
import FeatureControls from './FeatureControls';
import { useIsMobile } from '@/hooks/use-mobile';

interface AccessibilityPanelProps {
  isOpen: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, position }) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  // Apply different positioning based on device and configured position
  const getPanelPositionClass = () => {
    if (isMobile) {
      // On mobile, panel takes full width and positions at bottom or top
      if (position.startsWith('bottom')) {
        return 'bottom-16 inset-x-0 mx-auto';
      } else {
        return 'top-16 inset-x-0 mx-auto';
      }
    } else {
      // On desktop, position according to the configured corner
      return {
        'bottom-right': 'bottom-16 right-4',
        'bottom-left': 'bottom-16 left-4',
        'top-right': 'top-16 right-4',
        'top-left': 'top-16 left-4'
      }[position];
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return (
    <div 
      className={`fixed ${getPanelPositionClass()} ${isMobile ? 'w-[95%] max-w-md' : 'w-80'} bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-50`}
      dir="rtl"
      style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        opacity: isOpen ? 1 : 0,
        maxHeight: isMobile ? 'calc(100vh - 140px)' : 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* Panel Header - Sticky */}
      <div className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white py-4 px-5 sticky top-0 z-10">
        <h2 className="text-xl font-bold">הגדרות נגישות</h2>
        <p className="text-xs text-blue-100 opacity-90 mt-1">בהתאם לתקן ישראלי 5568</p>
      </div>

      {/* Panel Content - Scrollable */}
      <div className="p-5">
        <FeatureControls />
      </div>
      
      {/* Footer - Sticky */}
      <div className="bg-gray-50 px-5 py-3 text-center text-xs text-gray-500 border-t border-gray-200 sticky bottom-0">
        זכויות יוצרים © 2025 - כלי נגישות לאתרים בעברית
      </div>
    </div>
  );
};

export default AccessibilityPanel;
