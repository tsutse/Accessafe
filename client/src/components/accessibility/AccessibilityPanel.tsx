import React from 'react';
import FeatureControls from './FeatureControls';

interface AccessibilityPanelProps {
  isOpen: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ isOpen, position }) => {
  // Position the panel based on the widget position
  const panelPositionClass = {
    'bottom-right': 'bottom-16 right-0',
    'bottom-left': 'bottom-16 left-0',
    'top-right': 'top-16 right-0',
    'top-left': 'top-16 left-0'
  }[position];

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute ${panelPositionClass} w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200`}
      dir="rtl"
      style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        opacity: isOpen ? 1 : 0,
      }}
    >
      {/* Panel Header */}
      <div className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white py-4 px-5">
        <h2 className="text-xl font-bold">הגדרות נגישות</h2>
        <p className="text-xs text-blue-100 opacity-90 mt-1">בהתאם לתקן ישראלי 5568</p>
      </div>

      {/* Panel Content */}
      <div className="p-5">
        <FeatureControls />
      </div>
      
      <div className="bg-gray-50 px-5 py-3 text-center text-xs text-gray-500 border-t border-gray-200">
        זכויות יוצרים © 2025 - כלי נגישות לאתרים בעברית
      </div>
    </div>
  );
};

export default AccessibilityPanel;
