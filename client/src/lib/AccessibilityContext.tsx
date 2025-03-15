import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  linkHighlight: boolean;
  keyboardNav: boolean;
  bigCursor: boolean;
  noAnimations: boolean;
  tts: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  isOpen: boolean;
  togglePanel: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  linkHighlight: false,
  keyboardNav: false,
  bigCursor: false,
  noAnimations: false,
  tts: false
};

export const AccessibilityContext = createContext<AccessibilityContextType>({
  settings: defaultSettings,
  updateSetting: () => {},
  isOpen: false,
  togglePanel: () => {},
  resetSettings: () => {}
});

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load settings from localStorage on mount
    const storedSettings = localStorage.getItem('a11y-preferences');
    if (storedSettings) {
      try {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(storedSettings)
        });
      } catch (e) {
        console.error('Error loading accessibility preferences:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    
    // Apply CSS classes to body
    const bodyClasses = [
      { enabled: settings.highContrast, className: 'a11y-high-contrast' },
      { enabled: settings.grayscale, className: 'a11y-grayscale' },
      { enabled: settings.linkHighlight, className: 'a11y-link-highlight' },
      { enabled: settings.keyboardNav, className: 'a11y-keyboard-nav' },
      { enabled: settings.bigCursor, className: 'a11y-big-cursor' },
      { enabled: settings.noAnimations, className: 'a11y-no-animations' }
    ];
    
    bodyClasses.forEach(({ enabled, className }) => {
      if (enabled) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    });
    
    // Save settings to localStorage
    try {
      localStorage.setItem('a11y-preferences', JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving accessibility preferences:', e);
    }
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        isOpen,
        togglePanel,
        resetSettings
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
