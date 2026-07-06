const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public'),
];

const replacements = [
  { regex: /Physics/g, replacement: 'History' },
  { regex: /physics/g, replacement: 'history' },
  { regex: /PHYSICS/g, replacement: 'HISTORY' },
  
  { regex: /Chemistry/g, replacement: 'Geography' },
  { regex: /chemistry/g, replacement: 'geography' },
  { regex: /CHEMISTRY/g, replacement: 'GEOGRAPHY' },
  
  { regex: /Biology/g, replacement: 'Political Science' },
  { regex: /biology/g, replacement: 'political science' },
  { regex: /BIOLOGY/g, replacement: 'POLITICAL_SCIENCE' },
  
  { regex: /Mathematics/g, replacement: 'Economics' },
  { regex: /mathematics/g, replacement: 'economics' },
  { regex: /MATHEMATICS/g, replacement: 'ECONOMICS' },
  
  { regex: /SST/g, replacement: 'SOCIOLOGY' },
];

function processFile(filePath) {
  try {
    const ext = path.extname(filePath);
    if (!['.ts', '.tsx', '.json', '.md', '.css', '.html'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const r of replacements) {
      content = content.replace(r.regex, r.replacement);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(dir => processDirectory(dir));

console.log("Replacement complete.");
