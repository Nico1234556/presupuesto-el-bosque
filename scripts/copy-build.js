import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distTemplateHtml = path.join(rootDir, 'dist', 'template.html');
const distIndexHtml = path.join(rootDir, 'dist', 'index.html');
const rootIndexHtml = path.join(rootDir, 'index.html');

const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

// 1. Copy dist/template.html -> dist/index.html and root/index.html
if (fs.existsSync(distTemplateHtml)) {
  fs.copyFileSync(distTemplateHtml, rootIndexHtml);
  fs.copyFileSync(distTemplateHtml, distIndexHtml);
  console.log('✓ Successfully synced index.html in root and dist/');
}

// 2. Copy dist/assets/* -> root/assets/*
if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(
      path.join(distAssetsDir, file),
      path.join(rootAssetsDir, file)
    );
  }
  console.log(`✓ Copied ${files.length} asset files to root ./assets/ for GitHub Pages static serving`);
}
