const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST, { recursive: true });

// 1. Build Tailwind CSS (gera dist/css/style.css)
const cssDir = path.join(DIST, 'css');
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
execSync(
  'npx tailwindcss -i src/input.css -o dist/css/style.css --minify',
  { cwd: ROOT, stdio: 'inherit' }
);
console.log('Build CSS: dist/css/style.css');

// 2. Copiar index.html e assets
fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(DIST, 'index.html'));
console.log('Copiado: index.html');

copyRecursive(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
console.log('Copiado: assets/');

// 3. Copiar .htaccess para dist
if (fs.existsSync(path.join(ROOT, '.htaccess'))) {
  fs.copyFileSync(path.join(ROOT, '.htaccess'), path.join(DIST, '.htaccess'));
  console.log('Copiado: .htaccess');
}

console.log('\nBuild concluído. Deploy da pasta dist/');
