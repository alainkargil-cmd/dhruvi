# 📖 The Library of Little Moments
### An Immersive Interactive 3D Birthday Experience for Dhruvi

> *"Every life is a story. Some people make the pages more beautiful."*

Welcome to **The Library of Little Moments**, a magical, cinematic 3D fantasy birthday experience created specifically for **Dhruvi**. Designed with an enchanted dark-academia aesthetic, this production-ready application transports the visitor into a grand 3D library where every book, room, gift, and constellation celebrates Dhruvi's life, friendships, growth, and birthday.

---

## ✨ Features & Complete Experience Flow

1. **Chapter 1: The Mysterious Invitation**
   - Antique closed leather book on a mahogany table.
   - A floating golden feather with glowing ink writes a personal invitation for Dhruvi.
   - The book physically opens with shimmering golden light and rising dust motes.
   - Interactive *"ENTER THE LIBRARY"* entry button with Web Audio ambient music initialization.

2. **Chapter 2: The Grand Enchanted Library**
   - Immersive 3D environment rendered in Three.js and React Three Fiber.
   - Tall mahogany bookshelves with multi-hued leather-bound books.
   - Arched windows with streaming warm golden sunlight and moonlight beams.
   - Central crystal chandelier with warm ambient point lighting.
   - **Interactive Elements**:
     - *Floating Books*: Gently bob and tilt in mid-air, reacting to hover and selection.
     - *Magical Butterflies*: Fly along 3D orbits and flap wings; clicking triggers sparkle bursts.
     - *Enchanted Lamp*: Banker's desk lamp toggles ambient room lighting on and off.
     - *Secret Desk Drawer*: Pull out to read a hidden handwritten note.
     - *Celestial Brass Globe*: Drag and spin to reveal inspirational travel and life messages.
     - *Hidden Glowing Book*: Opens to reveal an exclusive grimoire dedication.

3. **The Four Special Storybooks**:
   - **Book 1: The Little Beginning** (*Childhood*): Warm memory corner with antique golden frame holding the childhood photograph.
   - **Book 2: Becoming Dhruvi** (*Growth & Grace*): Grand arched gallery featuring 3 solo portraits with elegant golden framing and captions.
   - **Book 3: Our Little Chaos** (*Friendship*): Cozy room with polaroid strings, scrapbooks, and teasing friendship notes.
   - **Book 4: The Next Chapter** (*The Future*): Dreamy celestial room overlooking a starry night sky with floating wishes.

4. **The Magical Gift Room & 4 Distinct 3D Presents**:
   - Four uniquely wrapped 3D gift boxes with animated lifting lids, ribbons, and glowing interiors:
     - **Gift 1: The Gift of Laughter**: Pastel pink & champagne gold box. "WARNING: A highly classified funny memory has been discovered!" Plays Dhruvi's funny-filter video in a floating golden frame.
     - **Gift 2: The Gift of Memories**: Miniature 3D scrapbook with page turns and friendship Polaroid photos.
     - **Gift 3: The Gift of a Thousand Wishes**: Interactive 3D galaxy with clickable glowing stars revealing customized birthday wishes.
     - **Gift 4: The Mystery Gift**: Deep burgundy box with gold ribbon and wax seal. The seal breaks, lid lifts, golden light and butterflies rise to reveal the secret group photograph (`group-surprise.jpg`), kept strictly hidden until this moment!

5. **The Interactive Birthday Cake Ceremony**:
   - Multi-tier 3D cake on an ornate golden pedestal with piped frosting and champagne-gold pearls.
   - Glowing candles with flickering flames.
   - *"Make a wish, Dhruvi!"* prompt.
   - *"BLOW OUT THE CANDLES"* button: flames flicker, extinguish, and subtle smoke rises.
   - Golden cake knife appears for interactive cake slicing: separates the first slice onto a golden serving plate!

6. **Grand Birthday Reveal & 3D Virtual Fireworks Show**:
   - Camera pulls back to reveal:
     ```
     HAPPY BIRTHDAY, DHRUVI!
     "May your life always be as beautiful as the stories you create."
     ```
   - **Custom 5-Phase 3D Fireworks Particle System**:
     - Phase 1: Rising golden launch trails and warm bursts.
     - Phase 2: Rose-pink, lavender, champagne gold, white, and soft-blue bursts.
     - Phase 3: Special shapes: Spherical, Chrysanthemum, Ring, Willow, and Heart-shaped explosions.
     - Phase 4: **`DHRUVI`** spelled out across the 3D sky in glowing golden spark coordinates!
     - Phase 5: Grand finale simultaneous willow and heart cascades.
     - *"WATCH THE FIREWORKS AGAIN"* replay button.

7. **The Final Birthday Letter**:
   - Antique warm ivory parchment with golden edges, wax seal, and handwritten script.
   - Heartfelt message from the specification.
   - *"RETURN TO THE LIBRARY"* and *"EXPERIENCE THE CELEBRATION AGAIN"* buttons.

8. **Sound Design & Web Audio API Engine**:
   - Custom synthesized ambient music and sound effects (page turns, gift opening, candle blowing, cake slicing, fireworks launches/booms).
   - Works immediately out of the box with zero 404s, while supporting external MP3s.

---

## 📁 Customization & Asset Guide

Personalize all copy, photographs, and media in `src/config/birthdayConfig.ts`.

### 1. Photos (`public/assets/photos/`)
Replace the generated placeholder SVGs with Dhruvi's real photographs:
- `childhood.jpg`: Childhood photo (The Little Beginning)
- `solo-01.jpg`: Central portrait (Becoming Dhruvi)
- `solo-02.jpg`: Left floating portrait (Becoming Dhruvi)
- `solo-03.jpg`: Right floating portrait (Becoming Dhruvi)
- `friends-01.jpg`: Friendship photo 1 (Our Little Chaos & Gift 2)
- `friends-02.jpg`: Friendship photo 2 (Our Little Chaos & Gift 2)
- `group-surprise.jpg`: Secret group photo (*strictly hidden until Mystery Gift 4 is opened!*)

### 2. Video (`public/assets/videos/`)
- Place Dhruvi's funny-filter video at `public/assets/videos/funny-filter-video.mp4`.

### 3. Optional Custom Audio (`public/assets/audio/`)
- `background-music.mp3`, `page-turn.mp3`, `gift-open.mp3`, `candle-blow.mp3`, `cake-cut.mp3`, `fireworks.mp3`.
*(If omitted, the built-in Web Audio API synthesizer generates all sounds automatically).*

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, go to **Settings > Pages > Build and deployment > Source** and select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy the site upon push!
