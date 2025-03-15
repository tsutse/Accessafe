/**
 * HebrewAccessibilityWidget.tsx
 * 
 * This is the main entry point for the embeddable accessibility widget.
 * It exports a standalone function that can be used to initialize the widget
 * on any website.
 */

import './HebrewAccessibilityWidget.css';

class HebrewAccessibilityTool {
  private container: HTMLElement | null = null;
  private settings = {
    fontSize: 100,
    highContrast: false,
    grayscale: false,
    linkHighlight: false,
    keyboardNav: false,
    bigCursor: false,
    noAnimations: false,
    tts: false,
    position: 'bottom-right' as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  };
  private isOpen: boolean = false;
  private currentlySpeaking: boolean = false;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(options?: {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  }) {
    if (options?.position) {
      this.settings.position = options.position;
    }
    
    this.loadPreferences();
    this.init();
  }

  private init() {
    // Create the widget container
    this.container = document.createElement('div');
    this.container.id = 'a11y-widget';
    this.container.className = `a11y-widget ${this.settings.position}`;
    this.container.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    document.body.appendChild(this.container);

    // Create the toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'a11y-toggle-btn';
    toggleBtn.className = 'a11y-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'תפריט נגישות');
    toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="a11y-icon"><path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path><path d="M5 10a7 7 0 0 0 7 7"></path><path d="M12 17a7 7 0 0 0 7-7"></path><path d="M12 17v5"></path><line x1="5" y1="10" x2="19" y2="10"></line></svg>';
    this.container.appendChild(toggleBtn);

    // Create the panel
    const panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.className = 'a11y-panel';
    this.container.appendChild(panel);

    // Add the panel header
    const panelHeader = document.createElement('div');
    panelHeader.className = 'a11y-panel-header';
    panelHeader.innerHTML = '<h2>הגדרות נגישות</h2><p class="a11y-compliance">בהתאם לתקנה 5568</p>';
    panel.appendChild(panelHeader);

    // Add the panel content
    const panelContent = document.createElement('div');
    panelContent.className = 'a11y-panel-content';
    panel.appendChild(panelContent);

    // Add font size controls
    const fontSizeSection = document.createElement('div');
    fontSizeSection.className = 'a11y-section';
    fontSizeSection.innerHTML = `
      <h3>גודל טקסט</h3>
      <div class="a11y-controls">
        <button id="a11y-font-decrease">-</button>
        <span id="a11y-font-size">${this.settings.fontSize}%</span>
        <button id="a11y-font-increase">+</button>
      </div>
    `;
    panelContent.appendChild(fontSizeSection);

    // Add display options
    const displaySection = document.createElement('div');
    displaySection.className = 'a11y-section';
    displaySection.innerHTML = `
      <h3>תצוגה</h3>
      <div class="a11y-toggle-control">
        <label for="a11y-contrast">ניגודיות גבוהה</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-contrast" ${this.settings.highContrast ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
      <div class="a11y-toggle-control">
        <label for="a11y-grayscale">מצב שחור-לבן</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-grayscale" ${this.settings.grayscale ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
      <div class="a11y-toggle-control">
        <label for="a11y-links">הדגשת קישורים</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-links" ${this.settings.linkHighlight ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
    `;
    panelContent.appendChild(displaySection);

    // Add navigation options
    const navSection = document.createElement('div');
    navSection.className = 'a11y-section';
    navSection.innerHTML = `
      <h3>ניווט</h3>
      <div class="a11y-toggle-control">
        <label for="a11y-keyboard">ניווט מקלדת</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-keyboard" ${this.settings.keyboardNav ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
      <div class="a11y-toggle-control">
        <label for="a11y-cursor">סמן מוגדל</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-cursor" ${this.settings.bigCursor ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
    `;
    panelContent.appendChild(navSection);

    // Add content options
    const contentSection = document.createElement('div');
    contentSection.className = 'a11y-section';
    contentSection.innerHTML = `
      <h3>תוכן</h3>
      <div class="a11y-toggle-control">
        <label for="a11y-animations">עצירת אנימציות</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-animations" ${this.settings.noAnimations ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
      <div class="a11y-toggle-control">
        <label for="a11y-tts">הקראת טקסט</label>
        <label class="a11y-switch">
          <input type="checkbox" id="a11y-tts" ${this.settings.tts ? 'checked' : ''}>
          <span class="a11y-slider"></span>
        </label>
      </div>
    `;
    panelContent.appendChild(contentSection);

    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.id = 'a11y-reset';
    resetButton.className = 'a11y-reset-btn';
    resetButton.textContent = 'איפוס הגדרות';
    panelContent.appendChild(resetButton);

    // Add CSS styles
    this.addStyles();

    // Setup event listeners
    this.setupEventListeners();

    // Apply initial settings
    this.applySettings();

    // Initialize TTS if enabled
    if (this.settings.tts) {
      this.setupTTS();
    }
  }

  private setupEventListeners() {
    if (!this.container) return;

    // Toggle button
    const toggleBtn = document.getElementById('a11y-toggle-btn');
    toggleBtn?.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.container?.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    });

    // Font size controls
    const decreaseBtn = document.getElementById('a11y-font-decrease');
    const increaseBtn = document.getElementById('a11y-font-increase');
    decreaseBtn?.addEventListener('click', () => {
      if (this.settings.fontSize > 80) {
        this.settings.fontSize -= 10;
        this.updateFontSizeDisplay();
        this.applySettings();
        this.savePreferences();
      }
    });
    increaseBtn?.addEventListener('click', () => {
      if (this.settings.fontSize < 200) {
        this.settings.fontSize += 10;
        this.updateFontSizeDisplay();
        this.applySettings();
        this.savePreferences();
      }
    });

    // Toggle switches
    const contrastToggle = document.getElementById('a11y-contrast') as HTMLInputElement;
    const grayscaleToggle = document.getElementById('a11y-grayscale') as HTMLInputElement;
    const linksToggle = document.getElementById('a11y-links') as HTMLInputElement;
    const keyboardToggle = document.getElementById('a11y-keyboard') as HTMLInputElement;
    const cursorToggle = document.getElementById('a11y-cursor') as HTMLInputElement;
    const animationsToggle = document.getElementById('a11y-animations') as HTMLInputElement;
    const ttsToggle = document.getElementById('a11y-tts') as HTMLInputElement;

    contrastToggle?.addEventListener('change', () => {
      this.settings.highContrast = contrastToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    grayscaleToggle?.addEventListener('change', () => {
      this.settings.grayscale = grayscaleToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    linksToggle?.addEventListener('change', () => {
      this.settings.linkHighlight = linksToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    keyboardToggle?.addEventListener('change', () => {
      this.settings.keyboardNav = keyboardToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    cursorToggle?.addEventListener('change', () => {
      this.settings.bigCursor = cursorToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    animationsToggle?.addEventListener('change', () => {
      this.settings.noAnimations = animationsToggle.checked;
      this.applySettings();
      this.savePreferences();
    });

    ttsToggle?.addEventListener('change', () => {
      this.settings.tts = ttsToggle.checked;
      if (this.settings.tts) {
        this.setupTTS();
      } else {
        this.removeTTS();
      }
      this.savePreferences();
    });

    // Reset button
    const resetBtn = document.getElementById('a11y-reset');
    resetBtn?.addEventListener('click', () => {
      this.resetSettings();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (this.isOpen && this.container && !this.container.contains(target)) {
        this.isOpen = false;
        this.container.setAttribute('data-state', 'closed');
      }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.isOpen = false;
        this.container?.setAttribute('data-state', 'closed');
      }
    });
  }

  private updateFontSizeDisplay() {
    const fontSizeEl = document.getElementById('a11y-font-size');
    if (fontSizeEl) {
      fontSizeEl.textContent = `${this.settings.fontSize}%`;
    }
  }

  private loadPreferences() {
    const saved = localStorage.getItem('a11y-preferences');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        this.settings = { ...this.settings, ...parsedSettings };
      } catch (e) {
        console.error('Error loading accessibility preferences:', e);
      }
    }
  }

  private savePreferences() {
    try {
      localStorage.setItem('a11y-preferences', JSON.stringify(this.settings));
    } catch (e) {
      console.error('Error saving accessibility preferences:', e);
    }
  }

  private applySettings() {
    // Font size
    document.documentElement.style.fontSize = `${this.settings.fontSize}%`;

    // High contrast
    if (this.settings.highContrast) {
      document.body.classList.add('a11y-high-contrast');
    } else {
      document.body.classList.remove('a11y-high-contrast');
    }

    // Grayscale
    if (this.settings.grayscale) {
      document.body.classList.add('a11y-grayscale');
    } else {
      document.body.classList.remove('a11y-grayscale');
    }

    // Link highlight
    if (this.settings.linkHighlight) {
      document.body.classList.add('a11y-link-highlight');
    } else {
      document.body.classList.remove('a11y-link-highlight');
    }

    // Keyboard navigation
    if (this.settings.keyboardNav) {
      document.body.classList.add('a11y-keyboard-nav');
    } else {
      document.body.classList.remove('a11y-keyboard-nav');
    }

    // Big cursor
    if (this.settings.bigCursor) {
      document.body.classList.add('a11y-big-cursor');
    } else {
      document.body.classList.remove('a11y-big-cursor');
    }

    // No animations
    if (this.settings.noAnimations) {
      document.body.classList.add('a11y-no-animations');
    } else {
      document.body.classList.remove('a11y-no-animations');
    }
  }

  private resetSettings() {
    // Reset to default settings
    this.settings = {
      ...this.settings,
      fontSize: 100,
      highContrast: false,
      grayscale: false,
      linkHighlight: false,
      keyboardNav: false,
      bigCursor: false,
      noAnimations: false,
      tts: false,
    };

    // Remove TTS if enabled
    this.removeTTS();

    // Update UI
    this.updateFontSizeDisplay();
    
    // Update checkbox states
    const checkboxes = ['a11y-contrast', 'a11y-grayscale', 'a11y-links', 'a11y-keyboard', 'a11y-cursor', 'a11y-animations', 'a11y-tts'];
    checkboxes.forEach(id => {
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    });

    // Apply settings and save
    this.applySettings();
    this.savePreferences();
  }

  private setupTTS() {
    // Check if speech synthesis is available
    if (!('speechSynthesis' in window)) {
      alert('הדפדפן שלך אינו תומך בהקראת טקסט');
      this.settings.tts = false;
      const ttsToggle = document.getElementById('a11y-tts') as HTMLInputElement;
      if (ttsToggle) {
        ttsToggle.checked = false;
      }
      return;
    }

    // Add event listeners to text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a, button, label, span');
    textElements.forEach(element => {
      element.setAttribute('data-a11y-tts', 'true');
      element.addEventListener('click', this.handleTTSClick.bind(this));
      element.addEventListener('focus', this.handleTTSFocus);
      element.addEventListener('blur', this.handleTTSBlur);
    });

    // Load voices
    window.speechSynthesis.onvoiceschanged = () => {
      // This is just to trigger voice loading in Chrome
      window.speechSynthesis.getVoices();
    };
    
    // Force load voices
    window.speechSynthesis.getVoices();
  }

  private removeTTS() {
    // Stop any ongoing speech
    if (this.currentlySpeaking) {
      window.speechSynthesis.cancel();
      this.currentlySpeaking = false;
    }

    // Remove event listeners from text elements
    const textElements = document.querySelectorAll('[data-a11y-tts="true"]');
    textElements.forEach(element => {
      element.removeAttribute('data-a11y-tts');
      element.removeEventListener('click', this.handleTTSClick.bind(this));
      element.removeEventListener('focus', this.handleTTSFocus);
      element.removeEventListener('blur', this.handleTTSBlur);
      element.classList.remove('a11y-tts-focus');
    });
  }

  private handleTTSClick(event: Event) {
    if (!this.settings.tts) return;

    const element = event.currentTarget as HTMLElement;
    this.speakText(element.textContent || '');

    // Remove previous highlights
    document.querySelectorAll('.a11y-tts-focus').forEach(el => {
      el.classList.remove('a11y-tts-focus');
    });

    // Highlight current element
    element.classList.add('a11y-tts-focus');
  }

  private handleTTSFocus(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('a11y-tts-focus');
  }

  private handleTTSBlur(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('a11y-tts-focus');
  }

  private speakText(text: string) {
    // Stop any ongoing speech
    if (this.currentlySpeaking) {
      window.speechSynthesis.cancel();
    }

    // Create utterance
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = 'he-IL';

    // Try to find a Hebrew voice
    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = voices.find(voice => voice.lang === 'he-IL');
    if (hebrewVoice) {
      this.utterance.voice = hebrewVoice;
    }

    // Handle speech events
    this.utterance.onstart = () => {
      this.currentlySpeaking = true;
    };

    this.utterance.onend = () => {
      this.currentlySpeaking = false;
    };

    this.utterance.onerror = () => {
      this.currentlySpeaking = false;
    };

    // Speak the text
    window.speechSynthesis.speak(this.utterance);
  }

  private addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Accessibility Widget Styles */
      :root {
        --a11y-primary: #424242;
        --a11y-dark: #121212;
        --a11y-light: #F5F5F5;
        --a11y-accent: #1976D2;
      }

      .a11y-widget {
        position: fixed;
        z-index: 9999;
        font-family: 'Heebo', Arial, sans-serif;
        transition: all 0.3s ease;
      }

      .a11y-widget.bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .a11y-widget.bottom-left {
        bottom: 20px;
        left: 20px;
      }

      .a11y-widget.top-right {
        top: 20px;
        right: 20px;
      }

      .a11y-widget.top-left {
        top: 20px;
        left: 20px;
      }

      .a11y-toggle-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: var(--a11y-dark);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
      }

      .a11y-toggle-btn:hover {
        background-color: var(--a11y-primary);
      }

      .a11y-toggle-btn:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.5);
      }

      [data-state="open"] .a11y-toggle-btn {
        transform: rotate(90deg);
      }

      .a11y-panel {
        display: none;
        width: 300px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        direction: rtl;
        text-align: right;
      }

      [data-state="open"] .a11y-panel {
        display: block;
        position: absolute;
      }

      .bottom-right[data-state="open"] .a11y-panel {
        bottom: 70px;
        right: 0;
      }

      .bottom-left[data-state="open"] .a11y-panel {
        bottom: 70px;
        left: 0;
      }

      .top-right[data-state="open"] .a11y-panel {
        top: 70px;
        right: 0;
      }

      .top-left[data-state="open"] .a11y-panel {
        top: 70px;
        left: 0;
      }

      .a11y-panel-header {
        background-color: var(--a11y-dark);
        color: white;
        padding: 12px 16px;
      }

      .a11y-panel-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      .a11y-panel-content {
        padding: 16px;
      }

      .a11y-section {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
      }

      .a11y-section:last-child {
        border-bottom: none;
      }

      .a11y-section h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 500;
        color: var(--a11y-dark);
      }

      .a11y-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .a11y-controls button {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        background-color: var(--a11y-light);
        border: 1px solid #ddd;
        font-size: 18px;
        cursor: pointer;
      }

      .a11y-controls button:hover {
        background-color: #e0e0e0;
      }

      .a11y-controls span {
        font-size: 16px;
      }

      .a11y-toggle-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .a11y-toggle-control:last-child {
        margin-bottom: 0;
      }

      .a11y-toggle-control label {
        font-size: 14px;
      }

      .a11y-switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;
      }

      .a11y-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .a11y-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
      }

      .a11y-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .a11y-slider {
        background-color: var(--a11y-accent);
      }

      input:focus + .a11y-slider {
        box-shadow: 0 0 1px var(--a11y-accent);
      }

      input:checked + .a11y-slider:before {
        transform: translateX(20px);
      }

      .a11y-reset-btn {
        display: block;
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        background-color: var(--a11y-dark);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .a11y-reset-btn:hover {
        background-color: var(--a11y-primary);
      }

      /* Accessibility Classes */
      .a11y-high-contrast {
        filter: contrast(150%);
      }

      .a11y-grayscale {
        filter: grayscale(100%);
      }

      .a11y-link-highlight a {
        text-decoration: underline !important;
        font-weight: bold !important;
        color: #0000FF !important;
      }

      .a11y-big-cursor,
      .a11y-big-cursor * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="white" stroke="black" stroke-width="4"/></svg>') 16 16, auto !important;
      }

      .a11y-no-animations *,
      .a11y-no-animations *:before,
      .a11y-no-animations *:after {
        animation: none !important;
        transition: none !important;
      }

      .a11y-keyboard-nav :focus {
        outline: 3px solid #1E90FF !important;
        box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.5) !important;
      }

      .a11y-tts-focus {
        outline: 3px solid #FFD700 !important;
        background-color: rgba(255, 215, 0, 0.2) !important;
      }

      /* Accessibility Icon */
      .a11y-icon {
        width: 24px;
        height: 24px;
      }
    `;
    document.head.appendChild(styleElement);
  }
}

// Expose the widget to the global window object
(window as any).HebrewAccessibilityTool = HebrewAccessibilityTool;

// Function to create an embeddable script
export function createEmbeddableScript(): string {
  const minifiedCode = `
  !function(){class e{constructor(e){this.container=null,this.settings={fontSize:100,highContrast:!1,grayscale:!1,linkHighlight:!1,keyboardNav:!1,bigCursor:!1,noAnimations:!1,tts:!1,position:"bottom-right"},this.isOpen=!1,this.currentlySpeaking=!1,this.utterance=null,e?.position&&(this.settings.position=e.position),this.loadPreferences(),this.init()}init(){this.container=document.createElement("div"),this.container.id="a11y-widget",this.container.className="a11y-widget "+this.settings.position,this.container.setAttribute("data-state",this.isOpen?"open":"closed"),document.body.appendChild(this.container);const e=document.createElement("button");e.id="a11y-toggle-btn",e.className="a11y-toggle-btn",e.setAttribute("aria-label","תפריט נגישות"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="a11y-icon"><path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path><path d="M5 10a7 7 0 0 0 7 7"></path><path d="M12 17a7 7 0 0 0 7-7"></path><path d="M12 17v5"></path><line x1="5" y1="10" x2="19" y2="10"></line></svg>',this.container.appendChild(e);const t=document.createElement("div");t.id="a11y-panel",t.className="a11y-panel",this.container.appendChild(t);const s=document.createElement("div");s.className="a11y-panel-header",s.innerHTML="<h2>הגדרות נגישות</h2>",t.appendChild(s);const a=document.createElement("div");a.className="a11y-panel-content",t.appendChild(a);const i=document.createElement("div");i.className="a11y-section",i.innerHTML='\n      <h3>גודל טקסט</h3>\n      <div class="a11y-controls">\n        <button id="a11y-font-decrease">-</button>\n        <span id="a11y-font-size">'+this.settings.fontSize+'%</span>\n        <button id="a11y-font-increase">+</button>\n      </div>\n    ',a.appendChild(i);const n=document.createElement("div");n.className="a11y-section",n.innerHTML='\n      <h3>תצוגה</h3>\n      <div class="a11y-toggle-control">\n        <label for="a11y-contrast">ניגודיות גבוהה</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-contrast" '+(this.settings.highContrast?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n      <div class="a11y-toggle-control">\n        <label for="a11y-grayscale">מצב שחור-לבן</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-grayscale" '+(this.settings.grayscale?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n      <div class="a11y-toggle-control">\n        <label for="a11y-links">הדגשת קישורים</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-links" '+(this.settings.linkHighlight?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n    ',a.appendChild(n);const o=document.createElement("div");o.className="a11y-section",o.innerHTML='\n      <h3>ניווט</h3>\n      <div class="a11y-toggle-control">\n        <label for="a11y-keyboard">ניווט מקלדת</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-keyboard" '+(this.settings.keyboardNav?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n      <div class="a11y-toggle-control">\n        <label for="a11y-cursor">סמן מוגדל</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-cursor" '+(this.settings.bigCursor?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n    ',a.appendChild(o);const l=document.createElement("div");l.className="a11y-section",l.innerHTML='\n      <h3>תוכן</h3>\n      <div class="a11y-toggle-control">\n        <label for="a11y-animations">עצירת אנימציות</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-animations" '+(this.settings.noAnimations?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n      <div class="a11y-toggle-control">\n        <label for="a11y-tts">הקראת טקסט</label>\n        <label class="a11y-switch">\n          <input type="checkbox" id="a11y-tts" '+(this.settings.tts?"checked":"")+'>\n          <span class="a11y-slider"></span>\n        </label>\n      </div>\n    ',a.appendChild(l);const r=document.createElement("button");r.id="a11y-reset",r.className="a11y-reset-btn",r.textContent="איפוס הגדרות",a.appendChild(r),this.addStyles(),this.setupEventListeners(),this.applySettings(),this.settings.tts&&this.setupTTS()}setupEventListeners(){if(!this.container)return;document.getElementById("a11y-toggle-btn")?.addEventListener("click",()=>{this.isOpen=!this.isOpen,this.container?.setAttribute("data-state",this.isOpen?"open":"closed")});const e=document.getElementById("a11y-font-decrease"),t=document.getElementById("a11y-font-increase");e?.addEventListener("click",()=>{this.settings.fontSize>80&&(this.settings.fontSize-=10,this.updateFontSizeDisplay(),this.applySettings(),this.savePreferences())}),t?.addEventListener("click",()=>{this.settings.fontSize<200&&(this.settings.fontSize+=10,this.updateFontSizeDisplay(),this.applySettings(),this.savePreferences())});const s=document.getElementById("a11y-contrast"),a=document.getElementById("a11y-grayscale"),i=document.getElementById("a11y-links"),n=document.getElementById("a11y-keyboard"),o=document.getElementById("a11y-cursor"),l=document.getElementById("a11y-animations"),r=document.getElementById("a11y-tts");s?.addEventListener("change",()=>{this.settings.highContrast=s.checked,this.applySettings(),this.savePreferences()}),a?.addEventListener("change",()=>{this.settings.grayscale=a.checked,this.applySettings(),this.savePreferences()}),i?.addEventListener("change",()=>{this.settings.linkHighlight=i.checked,this.applySettings(),this.savePreferences()}),n?.addEventListener("change",()=>{this.settings.keyboardNav=n.checked,this.applySettings(),this.savePreferences()}),o?.addEventListener("change",()=>{this.settings.bigCursor=o.checked,this.applySettings(),this.savePreferences()}),l?.addEventListener("change",()=>{this.settings.noAnimations=l.checked,this.applySettings(),this.savePreferences()}),r?.addEventListener("change",()=>{this.settings.tts=r.checked,this.settings.tts?this.setupTTS():this.removeTTS(),this.savePreferences()});document.getElementById("a11y-reset")?.addEventListener("click",()=>{this.resetSettings()}),document.addEventListener("click",e=>{const t=e.target;this.isOpen&&this.container&&!this.container.contains(t)&&(this.isOpen=!1,this.container.setAttribute("data-state","closed"))}),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.isOpen&&(this.isOpen=!1,this.container?.setAttribute("data-state","closed"))})}updateFontSizeDisplay(){const e=document.getElementById("a11y-font-size");e&&(e.textContent=this.settings.fontSize+"%")}loadPreferences(){const e=localStorage.getItem("a11y-preferences");if(e)try{const t=JSON.parse(e);this.settings={...this.settings,...t}}catch(e){console.error("Error loading accessibility preferences:",e)}}savePreferences(){try{localStorage.setItem("a11y-preferences",JSON.stringify(this.settings))}catch(e){console.error("Error saving accessibility preferences:",e)}}applySettings(){document.documentElement.style.fontSize=this.settings.fontSize+"%",this.settings.highContrast?document.body.classList.add("a11y-high-contrast"):document.body.classList.remove("a11y-high-contrast"),this.settings.grayscale?document.body.classList.add("a11y-grayscale"):document.body.classList.remove("a11y-grayscale"),this.settings.linkHighlight?document.body.classList.add("a11y-link-highlight"):document.body.classList.remove("a11y-link-highlight"),this.settings.keyboardNav?document.body.classList.add("a11y-keyboard-nav"):document.body.classList.remove("a11y-keyboard-nav"),this.settings.bigCursor?document.body.classList.add("a11y-big-cursor"):document.body.classList.remove("a11y-big-cursor"),this.settings.noAnimations?document.body.classList.add("a11y-no-animations"):document.body.classList.remove("a11y-no-animations")}resetSettings(){this.settings={...this.settings,fontSize:100,highContrast:!1,grayscale:!1,linkHighlight:!1,keyboardNav:!1,bigCursor:!1,noAnimations:!1,tts:!1},this.removeTTS(),this.updateFontSizeDisplay(),["a11y-contrast","a11y-grayscale","a11y-links","a11y-keyboard","a11y-cursor","a11y-animations","a11y-tts"].forEach(e=>{const t=document.getElementById(e);t&&(t.checked=!1)}),this.applySettings(),this.savePreferences()}setupTTS(){if(!("speechSynthesis"in window))return alert("הדפדפן שלך אינו תומך בהקראת טקסט"),this.settings.tts=!1,void(document.getElementById("a11y-tts")&&(document.getElementById("a11y-tts").checked=!1));document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, a, button, label, span").forEach(e=>{e.setAttribute("data-a11y-tts","true"),e.addEventListener("click",this.handleTTSClick.bind(this)),e.addEventListener("focus",this.handleTTSFocus),e.addEventListener("blur",this.handleTTSBlur)}),window.speechSynthesis.onvoiceschanged=()=>{window.speechSynthesis.getVoices()},window.speechSynthesis.getVoices()}removeTTS(){this.currentlySpeaking&&(window.speechSynthesis.cancel(),this.currentlySpeaking=!1),document.querySelectorAll('[data-a11y-tts="true"]').forEach(e=>{e.removeAttribute("data-a11y-tts"),e.removeEventListener("click",this.handleTTSClick.bind(this)),e.removeEventListener("focus",this.handleTTSFocus),e.removeEventListener("blur",this.handleTTSBlur),e.classList.remove("a11y-tts-focus")})}handleTTSClick(e){if(!this.settings.tts)return;const t=e.currentTarget;this.speakText(t.textContent||""),document.querySelectorAll(".a11y-tts-focus").forEach(e=>{e.classList.remove("a11y-tts-focus")}),t.classList.add("a11y-tts-focus")}handleTTSFocus(e){e.currentTarget.classList.add("a11y-tts-focus")}handleTTSBlur(e){e.currentTarget.classList.remove("a11y-tts-focus")}speakText(e){this.currentlySpeaking&&window.speechSynthesis.cancel(),this.utterance=new SpeechSynthesisUtterance(e),this.utterance.lang="he-IL";const t=window.speechSynthesis.getVoices().find(e=>"he-IL"===e.lang);t&&(this.utterance.voice=t),this.utterance.onstart=()=>{this.currentlySpeaking=!0},this.utterance.onend=()=>{this.currentlySpeaking=!1},this.utterance.onerror=()=>{this.currentlySpeaking=!1},window.speechSynthesis.speak(this.utterance)}addStyles(){const e=document.createElement("style");e.textContent="\n      /* Accessibility Widget Styles */\n      :root {\n        --a11y-primary: #424242;\n        --a11y-dark: #121212;\n        --a11y-light: #F5F5F5;\n        --a11y-accent: #1976D2;\n      }\n\n      .a11y-widget {\n        position: fixed;\n        z-index: 9999;\n        font-family: 'Heebo', Arial, sans-serif;\n        transition: all 0.3s ease;\n      }\n\n      .a11y-widget.bottom-right {\n        bottom: 20px;\n        right: 20px;\n      }\n\n      .a11y-widget.bottom-left {\n        bottom: 20px;\n        left: 20px;\n      }\n\n      .a11y-widget.top-right {\n        top: 20px;\n        right: 20px;\n      }\n\n      .a11y-widget.top-left {\n        top: 20px;\n        left: 20px;\n      }\n\n      .a11y-toggle-btn {\n        width: 56px;\n        height: 56px;\n        border-radius: 50%;\n        background-color: var(--a11y-dark);\n        color: white;\n        border: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);\n        transition: all 0.3s ease;\n      }\n\n      .a11y-toggle-btn:hover {\n        background-color: var(--a11y-primary);\n      }\n\n      .a11y-toggle-btn:focus {\n        outline: none;\n        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.5);\n      }\n\n      [data-state=\"open\"] .a11y-toggle-btn {\n        transform: rotate(90deg);\n      }\n\n      .a11y-panel {\n        display: none;\n        width: 300px;\n        border-radius: 8px;\n        background-color: white;\n        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n        overflow: hidden;\n        direction: rtl;\n        text-align: right;\n      }\n\n      [data-state=\"open\"] .a11y-panel {\n        display: block;\n        position: absolute;\n      }\n\n      .bottom-right[data-state=\"open\"] .a11y-panel {\n        bottom: 70px;\n        right: 0;\n      }\n\n      .bottom-left[data-state=\"open\"] .a11y-panel {\n        bottom: 70px;\n        left: 0;\n      }\n\n      .top-right[data-state=\"open\"] .a11y-panel {\n        top: 70px;\n        right: 0;\n      }\n\n      .top-left[data-state=\"open\"] .a11y-panel {\n        top: 70px;\n        left: 0;\n      }\n\n      .a11y-panel-header {\n        background-color: var(--a11y-dark);\n        color: white;\n        padding: 12px 16px;\n      }\n\n      .a11y-panel-header h2 {\n        margin: 0;\n        font-size: 18px;\n        font-weight: 500;\n      }\n\n      .a11y-panel-content {\n        padding: 16px;\n      }\n\n      .a11y-section {\n        margin-bottom: 16px;\n        padding-bottom: 16px;\n        border-bottom: 1px solid #eee;\n      }\n\n      .a11y-section:last-child {\n        border-bottom: none;\n      }\n\n      .a11y-section h3 {\n        margin: 0 0 12px 0;\n        font-size: 16px;\n        font-weight: 500;\n        color: var(--a11y-dark);\n      }\n\n      .a11y-controls {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .a11y-controls button {\n        width: 32px;\n        height: 32px;\n        border-radius: 4px;\n        background-color: var(--a11y-light);\n        border: 1px solid #ddd;\n        font-size: 18px;\n        cursor: pointer;\n      }\n\n      .a11y-controls button:hover {\n        background-color: #e0e0e0;\n      }\n\n      .a11y-controls span {\n        font-size: 16px;\n      }\n\n      .a11y-toggle-control {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 10px;\n      }\n\n      .a11y-toggle-control:last-child {\n        margin-bottom: 0;\n      }\n\n      .a11y-toggle-control label {\n        font-size: 14px;\n      }\n\n      .a11y-switch {\n        position: relative;\n        display: inline-block;\n        width: 44px;\n        height: 24px;\n      }\n\n      .a11y-switch input {\n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      .a11y-slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: #ccc;\n        transition: .4s;\n        border-radius: 24px;\n      }\n\n      .a11y-slider:before {\n        position: absolute;\n        content: \"\";\n        height: 18px;\n        width: 18px;\n        left: 3px;\n        bottom: 3px;\n        background-color: white;\n        transition: .4s;\n        border-radius: 50%;\n      }\n\n      input:checked + .a11y-slider {\n        background-color: var(--a11y-accent);\n      }\n\n      input:focus + .a11y-slider {\n        box-shadow: 0 0 1px var(--a11y-accent);\n      }\n\n      input:checked + .a11y-slider:before {\n        transform: translateX(20px);\n      }\n\n      .a11y-reset-btn {\n        display: block;\n        width: 100%;\n        padding: 10px;\n        margin-top: 10px;\n        background-color: var(--a11y-dark);\n        color: white;\n        border: none;\n        border-radius: 4px;\n        font-size: 14px;\n        cursor: pointer;\n        transition: background-color 0.3s;\n      }\n\n      .a11y-reset-btn:hover {\n        background-color: var(--a11y-primary);\n      }\n\n      /* Accessibility Classes */\n      .a11y-high-contrast {\n        filter: contrast(150%);\n      }\n\n      .a11y-grayscale {\n        filter: grayscale(100%);\n      }\n\n      .a11y-link-highlight a {\n        text-decoration: underline !important;\n        font-weight: bold !important;\n        color: #0000FF !important;\n      }\n\n      .a11y-big-cursor,\n      .a11y-big-cursor * {\n        cursor: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"white\" stroke=\"black\" stroke-width=\"4\"/></svg>') 16 16, auto !important;\n      }\n\n      .a11y-no-animations *,\n      .a11y-no-animations *:before,\n      .a11y-no-animations *:after {\n        animation: none !important;\n        transition: none !important;\n      }\n\n      .a11y-keyboard-nav :focus {\n        outline: 3px solid #1E90FF !important;\n        box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.5) !important;\n      }\n\n      .a11y-tts-focus {\n        outline: 3px solid #FFD700 !important;\n        background-color: rgba(255, 215, 0, 0.2) !important;\n      }\n\n      /* Accessibility Icon */\n      .a11y-icon {\n        width: 24px;\n        height: 24px;\n      }\n    ",document.head.appendChild(e)}}window.HebrewAccessibilityTool=e,document.addEventListener("DOMContentLoaded",()=>{new e})}();
  `;

  return `
  <!-- Hebrew Accessibility Widget - Start -->
  <script>
  ${minifiedCode}
  </script>
  <!-- Hebrew Accessibility Widget - End -->
  `;
}

// Create a React component that can be used in the demo
export function HebrewAccessibilityWidget() {
  return (
    <div id="hebrew-accessibility-widget-root"></div>
  );
}

export default HebrewAccessibilityWidget;
