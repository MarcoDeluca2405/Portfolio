const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');

// Percorso corretto del file SVG
const svgFilePath = path.join(__dirname, 'assets', 'pausa.svg'); // 'assets' è una cartella di livello superiore a 'nodeJS'

// Nome del componente da creare
const componentName = 'PuasaIcon';

// Percorso per la cartella del componente
const componentDir = path.join(__dirname, 'src', 'components', componentName);

// Percorso completo per il file .tsx
const outputFilePath = path.join(componentDir, `${componentName}.tsx`);

// Verifica se il file SVG esiste
if (fs.existsSync(svgFilePath)) {
  // Leggi il contenuto del file SVG
  fs.readFile(svgFilePath, 'utf8', async (err, svgCode) => {
    if (err) {
      console.error('Errore nella lettura del file SVG:', err);
      return;
    }

    // Converte l'SVG in un componente React usando SVGR
    try {
      const jsCode = await transform(
        svgCode,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          icon: true,
        },
        { componentName }
      );

      // Mostra il codice del componente React
      console.log('Componente React generato:', jsCode);

      // Verifica se la cartella del componente esiste, altrimenti la crea
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
        console.log(`Cartella creata: ${componentDir}`);
      }

      // Scrivi il risultato in un file .tsx
      fs.writeFile(outputFilePath, jsCode, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Errore nella scrittura del file React:', writeErr);
          return;
        }
        console.log(`Componente React scritto correttamente in: ${outputFilePath}`);
      });
    } catch (error) {
      console.error('Errore nella conversione SVG:', error);
    }
  });
} else {
  console.error(`File non trovato: ${svgFilePath}`);
}
