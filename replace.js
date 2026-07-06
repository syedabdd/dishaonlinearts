const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public'),
];

const targetFiles = [
  path.join(__dirname, 'package.json'),
  path.join(__dirname, 'README.md')
];

function processFile(filePath) {
  try {
    const ext = path.extname(filePath);
    if (!['.ts', '.tsx', '.json', '.md', '.css', '.html'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/Science/g, 'Arts');
    content = content.replace(/science/g, 'arts');
    content = content.replace(/SCIENCE/g, 'ARTS');

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
targetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
  }
});

console.log("Replacement complete.");
