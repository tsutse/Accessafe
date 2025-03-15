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
      className={`absolute ${panelPositionClass} w-72 bg-white rounded-lg shadow-xl overflow-hidden`}
      dir="rtl"
    >
      {/* Panel Header */}
      <div className="bg-a11y-dark text-white py-3 px-4">
        <h2 className="text-lg font-medium">הגדרות נגישות</h2>
      </div>

      {/* Panel Content */}
      <div className="p-4">
        <FeatureControls />
      </div>
    </div>
  );
};

export default AccessibilityPanel;
