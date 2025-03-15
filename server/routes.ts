import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static HTML files
  app.get('/terms.html', (req, res) => {
    const filePath = path.join(__dirname, '../public/terms.html');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/html');
      const content = fs.readFileSync(filePath, 'utf8');
      res.send(content);
    } else {
      res.status(404).send('File not found');
    }
  });
  
  app.get('/wcag-compliance.html', (req, res) => {
    const filePath = path.join(__dirname, '../public/wcag-compliance.html');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/html');
      const content = fs.readFileSync(filePath, 'utf8');
      res.send(content);
    } else {
      res.status(404).send('File not found');
    }
  });
  
  app.get('/implementation-example.html', (req, res) => {
    const filePath = path.join(__dirname, '../public/implementation-example.html');
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'text/html');
      const content = fs.readFileSync(filePath, 'utf8');
      res.send(content);
    } else {
      res.status(404).send('File not found');
    }
  });

  // Serve the embeddable script file
  app.get('/dist/hebrew-a11y.min.js', (req, res) => {
    // Read the minified script from the file
    const scriptPath = path.join(__dirname, '../public/dist/hebrew-a11y.min.js');
    
    try {
      if (fs.existsSync(scriptPath)) {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
        const content = fs.readFileSync(scriptPath, 'utf8');
        res.send(content);
      } else {
        res.status(404).send('Script not found');
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
        basic: '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" defer></script>',
        advanced: '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" data-position="bottom-right" defer></script>'
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
      ],
      positions: [
        'bottom-right (default)',
        'bottom-left',
        'top-right',
        'top-left'
      ]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
