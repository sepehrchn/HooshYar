// Test if your Grok API key is in the correct format
// Run with: node test-api-key.js

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking your Grok API key...\n');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('   Expected at:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
console.log('✅ .env.local file found');

// Parse the key
const lines = envContent.split('\n').filter(line => line.trim());
const keyLine = lines.find(line => line.startsWith('GROK_API_KEY='));

if (!keyLine) {
  console.log('❌ GROK_API_KEY not found in .env.local');
  console.log('   Add this line to .env.local:');
  console.log('   GROK_API_KEY=gsk_your_key_here');
  process.exit(1);
}

const key = keyLine.split('=')[1].trim();

console.log('\n📋 Key Details:');
console.log('   First 10 chars:', key.substring(0, 10) + '...');
console.log('   Total length:', key.length, 'characters');
console.log('   Starts with "gsk_":', key.startsWith('gsk_') ? '✅ YES' : '❌ NO');

console.log('\n🎯 Validation:');

// Check format
if (!key.startsWith('gsk_')) {
  console.log('❌ INVALID KEY FORMAT');
  console.log('   Your key starts with:', key.substring(0, 6));
  console.log('   Grok API keys should start with: gsk_');
  console.log('\n   Get your key from:');
  console.log('   👉 https://console.x.ai/');
  process.exit(1);
}

if (key.length < 40) {
  console.log('⚠️  WARNING: Key seems too short');
  console.log('   Your key is', key.length, 'characters');
  console.log('   Double-check you copied the entire key');
}

console.log('✅ Key format looks correct!');
console.log('   Your key starts with "gsk_"');
console.log('   Key length is reasonable');

console.log('\n🚀 Next Steps:');
console.log('   1. Stop your dev server (Ctrl+C)');
console.log('   2. Run: npm run dev');
console.log('   3. Test the chatbot at http://localhost:3000');

console.log('\n✨ If it still doesn\'t work, check:');
console.log('   • Browser console (F12) for errors');
console.log('   • Terminal logs for API errors');
console.log('   • Verify key is active at: https://console.x.ai/');
console.log('');
