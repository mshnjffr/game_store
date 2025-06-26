#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Full-Stack Integration Check\n');

// Check if all required directories exist
const requiredDirs = [
  'frontend',
  'backend', 
  'backend/src',
  'backend/prisma',
  'backend/images'
];

console.log('📁 Checking directory structure...');
let directoriesOk = true;
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - MISSING`);
    directoriesOk = false;
  }
});

// Check required files
const requiredFiles = [
  'package.json',
  'README.md',
  '.env.example',
  'frontend/package.json',
  'frontend/.env.example',
  'backend/package.json',
  'backend/.env.example',
  'backend/src/config/prisma.js',
  'backend/prisma/schema.prisma',
  'backend/prisma/seed.js'
];

console.log('\n📄 Checking required files...');
let filesOk = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    filesOk = false;
  }
});

// Check if backend controllers use Prisma
console.log('\n🔧 Checking backend integration...');
let backendOk = true;

// Check if gamesController uses Prisma
try {
  const gamesController = fs.readFileSync('backend/src/controllers/gamesController.js', 'utf8');
  if (gamesController.includes("require('../config/prisma')")) {
    console.log('✅ gamesController.js - Uses Prisma');
  } else {
    console.log('❌ gamesController.js - Not using Prisma');
    backendOk = false;
  }
} catch (e) {
  console.log('❌ gamesController.js - Not found');
  backendOk = false;
}

// Check if authController uses Prisma
try {
  const authController = fs.readFileSync('backend/src/controllers/authController.js', 'utf8');
  if (authController.includes("require('../config/prisma')")) {
    console.log('✅ authController.js - Uses Prisma');
  } else {
    console.log('❌ authController.js - Not using Prisma');
    backendOk = false;
  }
} catch (e) {
  console.log('❌ authController.js - Not found');
  backendOk = false;
}

// Check if ordersController uses Prisma
try {
  const ordersController = fs.readFileSync('backend/src/controllers/ordersController.js', 'utf8');
  if (ordersController.includes("require('../config/prisma')")) {
    console.log('✅ ordersController.js - Uses Prisma');
  } else {
    console.log('❌ ordersController.js - Not using Prisma');
    backendOk = false;
  }
} catch (e) {
  console.log('❌ ordersController.js - Not found');
  backendOk = false;
}

// Check package.json scripts
console.log('\n⚙️  Checking package.json scripts...');
let scriptsOk = true;
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'dev:backend', 'dev:frontend', 'db:setup', 'db:seed'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ npm run ${script}`);
    } else {
      console.log(`❌ npm run ${script} - MISSING`);
      scriptsOk = false;
    }
  });
} catch (e) {
  console.log('❌ package.json - Invalid or missing');
  scriptsOk = false;
}

// Final summary
console.log('\n📋 Integration Summary:');
console.log(`Directories: ${directoriesOk ? '✅ OK' : '❌ ISSUES'}`);
console.log(`Files: ${filesOk ? '✅ OK' : '❌ ISSUES'}`);
console.log(`Backend Integration: ${backendOk ? '✅ OK' : '❌ ISSUES'}`);
console.log(`Scripts: ${scriptsOk ? '✅ OK' : '❌ ISSUES'}`);

const allOk = directoriesOk && filesOk && backendOk && scriptsOk;

console.log(`\n🎯 Overall Status: ${allOk ? '✅ READY TO RUN' : '❌ NEEDS FIXES'}`);

if (allOk) {
  console.log('\n🚀 Next Steps:');
  console.log('1. Set up environment variables:');
  console.log('   cp .env.example .env');
  console.log('   cp frontend/.env.example frontend/.env.local');
  console.log('   cp backend/.env.example backend/.env');
  console.log('2. Update DATABASE_URL in backend/.env');
  console.log('3. Run: npm run db:setup');
  console.log('4. Run: npm run dev');
}

process.exit(allOk ? 0 : 1);
