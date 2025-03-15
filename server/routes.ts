import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the embeddable script file
  app.get('/api/accessibility-widget.js', (req, res) => {
    // Read the minified script from the file if exists, otherwise generate it
    const scriptPath = path.join(__dirname, '../dist/public/accessibility-widget.js');
    
    try {
      if (fs.existsSync(scriptPath)) {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
        const content = fs.readFileSync(scriptPath, 'utf8');
        res.send(content);
      } else {
        // Fallback to generating script dynamically (for development)
        const script = `
        !function(){class e{constructor(e){this.container=null,this.settings={fontSize:100,highContrast:!1,grayscale:!1,linkHighlight:!1,keyboardNav:!1,bigCursor:!1,noAnimations:!1,tts:!1,position:"bottom-right"},this.isOpen=!1,this.currentlySpeaking=!1,this.utterance=null,e?.position&&(this.settings.position=e.position),this.loadPreferences(),this.init()}init(){this.container=document.createElement("div"),this.container.id="a11y-widget",this.container.className="a11y-widget "+this.settings.position,this.container.setAttribute("data-state",this.isOpen?"open":"closed"),document.body.appendChild(this.container);const e=document.createElement("button");e.id="a11y-toggle-btn",e.className="a11y-toggle-btn",e.setAttribute("aria-label","תפריט נגישות"),e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="a11y-icon"><path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path><path d="M5 10a7 7 0 0 0 7 7"></path><path d="M12 17a7 7 0 0 0 7-7"></path><path d="M12 17v5"></path><line x1="5" y1="10" x2="19" y2="10"></line></svg>',this.container.appendChild(e);const t=document.createElement("div");t.id="a11y-panel",t.className="a11y-panel",this.container.appendChild(t);const s=document.createElement("div");s.className="a11y-panel-header",s.innerHTML="<h2>הגדרות נגישות</h2>",t.appendChild(s);const a=document.createElement("div");a.className="a11y-panel-content",t.appendChild(a);const i=document.createElement("div");i.className="a11y-section",i.innerHTML='\\n      <h3>גודל טקסט</h3>\\n      <div class="a11y-controls">\\n        <button id="a11y-font-decrease">-</button>\\n        <span id="a11y-font-size">'+this.settings.fontSize+'%</span>\\n        <button id="a11y-font-increase">+</button>\\n      </div>\\n    ',a.appendChild(i);const n=document.createElement("div");n.className="a11y-section",n.innerHTML='\\n      <h3>תצוגה</h3>\\n      <div class="a11y-toggle-control">\\n        <label for="a11y-contrast">ניגודיות גבוהה</label>\\n        <label class="a11y-switch">\\n          <input type="checkbox" id="a11y-contrast" '+(this.settings.highContrast?"checked":"")+'></label></div></div>',a.appendChild(n);const l=document.createElement("button");l.id="a11y-reset",l.className="a11y-reset-btn",l.textContent="איפוס הגדרות",a.appendChild(l),this.addStyles(),this.setupEventListeners(),this.applySettings(),this.settings.tts&&this.setupTTS()}/* Other methods are abbreviated for brevity */}window.HebrewAccessibilityTool=e,document.addEventListener("DOMContentLoaded",()=>{new e})}();
        `;
        
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(script);
      }
    } catch (error) {
      console.error('Error serving accessibility widget script:', error);
      res.status(500).send('Server error');
    }
  });

  // Serve documentation for integration
  app.get('/api/docs', (req, res) => {
    res.json({
      title: 'Hebrew Accessibility Widget Documentation',
      integration: {
        basic: '<script src="https://your-domain.com/api/accessibility-widget.js"></script>',
        advanced: '<script src="https://your-domain.com/api/accessibility-widget.js" data-position="bottom-right"></script>'
      },
      features: [
        'Font size adjustment',
        'High contrast mode',
        'Grayscale mode',
        'Link highlighting',
        'Keyboard navigation',
        'Big cursor',
        'Animation control',
        'Text-to-speech (Hebrew)'
      ]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
