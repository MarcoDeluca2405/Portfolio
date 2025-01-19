import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ottieni la directory del file attuale utilizzando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '..', 'public', 'Icone');
const outputPath = path.join(__dirname, 'iconsList.json');

const getIcons = () => {
    const files = fs.readdirSync(iconsDir);
    const icons = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg'))
                        .map(file => path.join('Icone', file));
    
    return icons;
};

const icons = getIcons();

fs.writeFileSync(outputPath, JSON.stringify(icons, null, 2), 'utf-8');

