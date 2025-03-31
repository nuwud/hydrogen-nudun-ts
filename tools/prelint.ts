// prelint.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const depsToCheck = [
  'react',
  'react-dom',
  '@shopify/hydrogen',
  '@react-three/fiber',
  '@react-three/drei',
  'eslint',
];

function getPackageVersion(pkg: string): string | null {
  try {
    const output = execSync(`npm list ${pkg} --depth=0`).toString();
    const match = output.match(new RegExp(`${pkg}@(.*?)\s`));
    return match?.[1] || 'installed but version not found';
  } catch {
    return null;
  }
}

function detectESLintConfig(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'eslint.config.js'))) return 'eslint.config.js (Flat Config)';
  if (fs.existsSync(path.join(cwd, '.eslintrc.js'))) return '.eslintrc.js';
  if (fs.existsSync(path.join(cwd, '.eslintrc.cjs'))) return '.eslintrc.cjs';
  if (fs.existsSync(path.join(cwd, '.eslintrc.json'))) return '.eslintrc.json';
  return 'No ESLint config found';
}

function printDiagnostics() {
    console.warn('\n🔍 Pre-Lint Diagnostic Report');
    console.warn('--------------------------------');
  
    for (const dep of depsToCheck) {
      const version = getPackageVersion(dep);
      if (version) {
        console.warn(`✅ ${dep} version: ${version}`);
      } else {
        console.warn(`❌ ${dep} is NOT installed.`);
      }
    }
  
    console.warn('\n📄 ESLint Config: ' + detectESLintConfig());
    console.warn('--------------------------------\n');
  }
  

printDiagnostics();
