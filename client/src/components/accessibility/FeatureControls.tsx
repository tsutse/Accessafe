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

  return (
    <div className="space-y-5">
      {/* Font Size */}
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-bold mb-2 text-a11y-dark">גודל טקסט</h3>
        <div className="flex items-center justify-between">
          <button 
            onClick={decreaseFontSize}
            className="w-10 h-10 flex items-center justify-center rounded bg-a11y-extralight hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="text-xl">-</span>
          </button>
          <div className="text-center">{settings.fontSize}%</div>
          <button 
            onClick={increaseFontSize}
            className="w-10 h-10 flex items-center justify-center rounded bg-a11y-extralight hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      {/* Display Options */}
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-bold mb-2 text-a11y-dark">תצוגה</h3>
        
        {/* Contrast */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="contrast-toggle" className="text-sm">ניגודיות גבוהה</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="contrast-toggle" 
              className="sr-only peer"
              checked={settings.highContrast}
              onChange={e => updateSetting('highContrast', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Grayscale */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="grayscale-toggle" className="text-sm">מצב שחור-לבן</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="grayscale-toggle" 
              className="sr-only peer"
              checked={settings.grayscale}
              onChange={e => updateSetting('grayscale', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Link Highlight */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="link-highlight-toggle" className="text-sm">הדגשת קישורים</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="link-highlight-toggle" 
              className="sr-only peer"
              checked={settings.linkHighlight}
              onChange={e => updateSetting('linkHighlight', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-bold mb-2 text-a11y-dark">ניווט</h3>
        
        {/* Keyboard Navigation */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="keyboard-nav-toggle" className="text-sm">ניווט מקלדת</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="keyboard-nav-toggle" 
              className="sr-only peer"
              checked={settings.keyboardNav}
              onChange={e => updateSetting('keyboardNav', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Cursor */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="cursor-toggle" className="text-sm">סמן מוגדל</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="cursor-toggle" 
              className="sr-only peer"
              checked={settings.bigCursor}
              onChange={e => updateSetting('bigCursor', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Content Options */}
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-bold mb-2 text-a11y-dark">תוכן</h3>
        
        {/* Animation Stop */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="animation-toggle" className="text-sm">עצירת אנימציות</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="animation-toggle" 
              className="sr-only peer"
              checked={settings.noAnimations}
              onChange={e => updateSetting('noAnimations', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Text to Speech */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="tts-toggle" className="text-sm">הקראת טקסט</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="tts-toggle" 
              className="sr-only peer"
              checked={settings.tts}
              onChange={e => updateSetting('tts', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Reset Button */}
      <button 
        onClick={resetSettings}
        className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all border border-gray-300"
      >
        איפוס הגדרות
      </button>
    </div>
  );
};

export default FeatureControls;
