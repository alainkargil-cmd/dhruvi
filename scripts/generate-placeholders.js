import fs from 'fs';
import path from 'path';

const photos = [
  { file: 'childhood.jpg', title: 'Childhood Memory', subtitle: 'Where Every Story Begins', color1: '#EADBC8', color2: '#102C57', icon: '✦' },
  { file: 'solo-01.jpg', title: 'Dhruvi — Portrait I', subtitle: 'Elegance & Quiet Confidence', color1: '#F8EDE3', color2: '#7D6E83', icon: '✧' },
  { file: 'solo-02.jpg', title: 'Dhruvi — Portrait II', subtitle: 'Dreamer & Achiever', color1: '#F1EAFF', color2: '#525FE1', icon: '✦' },
  { file: 'solo-03.jpg', title: 'Dhruvi — Portrait III', subtitle: 'Warmth & Radiance', color1: '#FFF3E2', color2: '#E57C23', icon: '✧' },
  { file: 'friends-01.jpg', title: 'Our Little Chaos I', subtitle: 'Unfiltered Laughter', color1: '#FFE5CA', color2: '#9B51E0', icon: '✦' },
  { file: 'friends-02.jpg', title: 'Our Little Chaos II', subtitle: 'Shared Stories & Smiles', color1: '#E8F3D6', color2: '#0E8388', icon: '✧' },
  { file: 'group-surprise.jpg', title: 'A Memory We All Share', subtitle: 'With All Of Us Together', color1: '#FDF7E4', color2: '#58111A', icon: '★' },
];

const outDir = path.resolve('public/assets/photos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

photos.forEach(({ file, title, subtitle, color1, color2, icon }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="#2C1810"/>
      </radialGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE494"/>
        <stop offset="50%" stop-color="#E5C158"/>
        <stop offset="100%" stop-color="#9A7B2C"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#bg)"/>
    <rect x="30" y="30" width="740" height="940" fill="none" stroke="url(#gold)" stroke-width="4" rx="12"/>
    <rect x="45" y="45" width="710" height="910" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-dasharray="6,6" rx="8"/>
    
    <!-- Ornate Corners -->
    <path d="M 60 100 L 60 60 L 100 60" fill="none" stroke="url(#gold)" stroke-width="3"/>
    <path d="M 740 100 L 740 60 L 700 60" fill="none" stroke="url(#gold)" stroke-width="3"/>
    <path d="M 60 900 L 60 940 L 100 940" fill="none" stroke="url(#gold)" stroke-width="3"/>
    <path d="M 740 900 L 740 940 L 700 940" fill="none" stroke="url(#gold)" stroke-width="3"/>

    <!-- Central Emblem -->
    <circle cx="400" cy="420" r="140" fill="${color2}" fill-opacity="0.2" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="400" cy="420" r="110" fill="none" stroke="url(#gold)" stroke-width="1" stroke-dasharray="4,4"/>
    <text x="400" y="445" font-family="'Cinzel', serif" font-size="70" fill="url(#gold)" text-anchor="middle">${icon}</text>

    <!-- Typography -->
    <text x="400" y="650" font-family="'Cinzel', Georgia, serif" font-size="36" font-weight="bold" fill="#FAF6F0" text-anchor="middle" letter-spacing="3">${title}</text>
    <line x1="250" y1="680" x2="550" y2="680" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="400" cy="680" r="4" fill="#FFE494"/>
    <text x="400" y="730" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="24" fill="#E5C158" text-anchor="middle">${subtitle}</text>
    <text x="400" y="860" font-family="'Inter', sans-serif" font-size="16" fill="#A89F91" text-anchor="middle" letter-spacing="4">THE LIBRARY OF LITTLE MOMENTS</text>
  </svg>`;

  fs.writeFileSync(path.join(outDir, file), svg, 'utf8');
});

console.log('Placeholder photo assets generated successfully in public/assets/photos/');
