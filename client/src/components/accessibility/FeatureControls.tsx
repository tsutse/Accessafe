import React from 'react';
import { useAccessibility } from '@/lib/AccessibilityContext';

const FeatureControls: React.FC = () => {
  const { settings, updateSetting, resetSettings } = useAccessibility();

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSetting('fontSize', settings.fontSize - 10);
    }
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 200) {
      updateSetting('fontSize', settings.fontSize + 10);
    }
  };

  // Function to create a themed toggle switch with an icon
  const ToggleSwitch = ({ 
    id, 
    label, 
    checked, 
    onChange, 
    icon 
  }: {
    id: string;
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    icon: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors mb-2">
      <div className="flex items-center flex-1 min-w-0">
        <div className="shrink-0 mr-2 text-blue-600">
          {icon}
        </div>
        <label htmlFor={id} className="text-sm font-medium cursor-pointer truncate">{label}</label>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-2">
        <input 
          type="checkbox" 
          id={id} 
          className="sr-only peer"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 
             peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
             after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
             after:transition-all peer-checked:bg-blue-600 transition-all duration-200"></div>
      </label>
    </div>
  );

  // SVG icons for each feature
  const icons = {
    fontSize: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"></polyline>
        <line x1="9" y1="20" x2="15" y2="20"></line>
        <line x1="12" y1="4" x2="12" y2="20"></line>
      </svg>
    ),
    contrast: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a10 10 0 0 1 0 20z"></path>
      </svg>
    ),
    grayscale: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8L22 8v12H12v-8L2 16V4z" />
      </svg>
    ),
    link: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
    keyboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
        <line x1="6" y1="8" x2="6" y2="8"></line>
        <line x1="10" y1="8" x2="10" y2="8"></line>
        <line x1="14" y1="8" x2="14" y2="8"></line>
        <line x1="18" y1="8" x2="18" y2="8"></line>
        <line x1="6" y1="12" x2="6" y2="12"></line>
        <line x1="10" y1="12" x2="10" y2="12"></line>
        <line x1="14" y1="12" x2="14" y2="12"></line>
        <line x1="18" y1="12" x2="18" y2="12"></line>
        <line x1="6" y1="16" x2="18" y2="16"></line>
      </svg>
    ),
    cursor: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
      </svg>
    ),
    animation: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 16V9h14V2H5v7" />
        <rect x="5" y="16" width="14" height="6" />
      </svg>
    ),
    tts: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    ),
  };

  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="flex items-center mb-3">
          <div className="shrink-0">
            {icons.fontSize}
          </div>
          <h3 className="font-bold text-blue-900 mr-2 text-base">גודל טקסט</h3>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
          <button 
            onClick={decreaseFontSize}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white hover:bg-blue-50 text-blue-700 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            aria-label="הקטן גודל טקסט"
          >
            <span className="text-xl font-bold">-</span>
          </button>
          <div className="text-center font-medium text-blue-700 text-lg bg-white py-1 px-3 sm:px-4 rounded-md shadow-sm border border-blue-100 mx-1 min-w-[60px]">
            {settings.fontSize}%
          </div>
          <button 
            onClick={increaseFontSize}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white hover:bg-blue-50 text-blue-700 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            aria-label="הגדל גודל טקסט"
          >
            <span className="text-xl font-bold">+</span>
          </button>
        </div>
      </div>

      {/* Display Options */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-blue-900 mb-3 text-base flex items-center">תצוגה</h3>
        
        <ToggleSwitch 
          id="contrast-toggle"
          label="ניגודיות גבוהה"
          checked={settings.highContrast}
          onChange={(checked) => updateSetting('highContrast', checked)}
          icon={icons.contrast}
        />
        
        <ToggleSwitch 
          id="grayscale-toggle"
          label="מצב שחור-לבן"
          checked={settings.grayscale}
          onChange={(checked) => updateSetting('grayscale', checked)}
          icon={icons.grayscale}
        />
        
        <ToggleSwitch 
          id="link-highlight-toggle"
          label="הדגשת קישורים"
          checked={settings.linkHighlight}
          onChange={(checked) => updateSetting('linkHighlight', checked)}
          icon={icons.link}
        />
      </div>

      {/* Navigation Options */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-blue-900 mb-3 text-base">ניווט</h3>
        
        <ToggleSwitch 
          id="keyboard-nav-toggle"
          label="ניווט מקלדת"
          checked={settings.keyboardNav}
          onChange={(checked) => updateSetting('keyboardNav', checked)}
          icon={icons.keyboard}
        />
        
        <ToggleSwitch 
          id="cursor-toggle"
          label="סמן מוגדל"
          checked={settings.bigCursor}
          onChange={(checked) => updateSetting('bigCursor', checked)}
          icon={icons.cursor}
        />
      </div>

      {/* Content Options */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-blue-900 mb-3 text-base">תוכן</h3>
        
        <ToggleSwitch 
          id="animation-toggle"
          label="עצירת אנימציות"
          checked={settings.noAnimations}
          onChange={(checked) => updateSetting('noAnimations', checked)}
          icon={icons.animation}
        />
        
        <ToggleSwitch 
          id="tts-toggle"
          label="הקראת טקסט"
          checked={settings.tts}
          onChange={(checked) => updateSetting('tts', checked)}
          icon={icons.tts}
        />
      </div>

      {/* Reset Button */}
      <button 
        onClick={resetSettings}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md text-base"
      >
        איפוס הגדרות
      </button>
    </div>
  );
};

export default FeatureControls;
