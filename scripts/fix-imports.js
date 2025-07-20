const fs = require('fs');
const path = require('path');
const glob = require('glob');

const mappings = {
  '../components/': '@components/',
  '../contexts/': '@contexts/',
  '../hooks/': '@hooks/',
  '../pages/': '@pages/',
  '../utils/': '@utils/',
  '../services/': '@services/',
  '../types/': '@types/',
  '../config/': '@config/',
  '../assets/': '@assets/',
  '../': '@/',
  './': '@/'
};

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [oldPath, newPath] of Object.entries(mappings)) {
    const regex = new RegExp(`from ['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `from '${newPath}`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

// Fix all TypeScript/React files
const files = glob.sync('src/**/*.{ts,tsx}');
files.forEach(fixImports);