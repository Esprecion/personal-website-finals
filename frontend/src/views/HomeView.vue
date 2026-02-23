<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-overlay"></div>
      <div class="hero-scanline"></div>
      <div class="container hero-inner">
        <div class="hero-stamp">
          <span>☣</span> Still Surviving — Urdaneta City, Pangasinan
        </div>
        <h1 class="hero-title">
          I'm <span class="hero-name">Shurlee</span>,<br />
          a <span class="hero-role">Full-Stack Developer?</span>
        </h1>
        <div class="hero-rule"></div>
        <p class="hero-sub">
          Building digital shelters in a world overrun by complexity.
          Vue.js · NestJS · Supabase. Based in the Philippines.
        </p>
        <div class="hero-actions">
          <RouterLink to="/guestbook" class="btn btn-primary">☠ Leave a Message</RouterLink>
          <a href="#projects" class="btn btn-ghost">View Projects</a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">3+</span>
            <span class="stat-label">Projects Survived</span>
          </div>
          <div class="stat">
            <span class="stat-num">APC</span>
            <span class="stat-label">Asia Pacific College</span>
          </div>
          <div class="stat">
            <span class="stat-num">∞</span>
            <span class="stat-label">Cups of Coffee</span>
          </div>
        </div>
      </div>
      <div class="hero-corner hero-corner-tl">SECTOR-07</div>
      <div class="hero-corner hero-corner-br">STATUS: ALIVE</div>
    </section>

    <!-- ABOUT -->
    <section class="section" id="about">
      <div class="container">
        <div class="section-label">// survivor profile</div>
        <div class="about-grid">
          <div class="about-img-wrap">
            <div class="about-img-frame">
            <img src="../assets/Ashlee.jpeg" style="width:100%;height:200%;object-fit:cover;" />
              <div class="about-img-corner about-img-corner-tl"></div>
              <div class="about-img-corner about-img-corner-br"></div>
            </div>
            <div class="about-tag">ID: ADE-001</div>
          </div>
          <div class="about-content">
            <h2 class="section-title">Crafting <span class="accent">digital fortresses</span><br/>in hostile terrain</h2>
            <p>
              I'm a IT student at <strong>Asia Pacific College</strong> with a curiousity
              for full-stack web development. Like navigating a post-apocalyptic world, I build things
              that work when everything else falls apart — clean frontends, solid backends, reliable APIs.
            </p>
            <p style="margin-top:16px;">
              Off the keyboard, I'm a console gamer drawn to story-driven worlds like Ghost of Tsushima,
              Dark Souls, and God of War. I love cooking and helping out at family celebrations
              especially in the sweets section. My favorite moments are spending time with my grandmother,
              listening to her stories from her evangelist travels abroad.
            </p>
            <div class="about-badges">
              <span class="badge">Vue.js</span>
              <span class="badge">NestJS</span>
              <span class="badge">Supabase</span>
              <span class="badge">Flutter</span>
              <span class="badge">Node.js</span>
              <span class="badge">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="blood-line"></div>

    <!-- PROJECTS -->
    <section class="section" id="projects">
      <div class="container">
        <div class="section-label">// field operations</div>
        <h2 class="section-title">Things I've <span class="accent">Built</span></h2>
        <div class="projects-grid">
          <div class="project-card" v-for="p in projects" :key="p.title">
            <div class="project-card-top">
              <div class="project-number">{{ p.num }}</div>
              <div class="project-tags">
                <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
              </div>
            </div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="project-links">
              <a :href="p.link" target="_blank" class="project-link">
                {{ p.linkLabel }} →
              </a>
              <a :href="p.live" target="_blank" v-if="p.live" class="project-link project-link-live">
                &#47;&#47; Live →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="blood-line"></div>

    <!-- SKILLS -->
    <section class="section" id="skills">
      <div class="container">
        <div class="section-label">// survival kit</div>
        <h2 class="section-title">My <span class="accent">Tech Stack</span></h2>
        <div class="skills-grid">
          <div class="skill-group" v-for="g in skillGroups" :key="g.label">
            <div class="skill-group-header">
              <span class="skill-group-icon">{{ g.icon }}</span>
              <span class="skill-group-label">{{ g.label }}</span>
            </div>
            <div class="skill-chips">
              <span class="chip" v-for="s in g.items" :key="s">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BANNER -->
    <div class="quote-banner">
      <div class="container">
        <blockquote class="twd-quote">
          "We are the walking dead."
          <span class="quote-attr">— Rick Grimes, The Walking Dead</span>
        </blockquote>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
let konamiIndex = 0

function handleKonami(e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konamiCode.length) {
      spawnWalker()
      konamiIndex = 0
    }
  } else {
    konamiIndex = 0
  }
}

function spawnWalker() {
  const overlay = document.createElement('div')
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0);z-index:9998;pointer-events:none;transition:background 0.3s ease;`
  document.body.appendChild(overlay)
  setTimeout(() => overlay.style.background = 'rgba(0,0,0,0.6)', 50)

  const walker = document.createElement('div')
  walker.innerHTML = '<img src="/zombie.png" style="width:300px;height:auto;display:block;mix-blend-mode:multiply;" />'
  walker.style.cssText = `position:fixed;top:50%;left:-200px;transform:translateY(-50%);font-size:12rem;z-index:9999;pointer-events:none;transition:left 0.4s cubic-bezier(0.2,0,0.8,1),font-size 0.4s ease;filter:drop-shadow(0 0 40px rgba(139,0,0,0.9));`
  document.body.appendChild(walker)

  setTimeout(() => {
    walker.style.left = '50%'
    walker.style.transform = 'translateY(-50%) translateX(-50%)'
    walker.style.fontSize = '18rem'
  }, 50)

  const scream = document.createElement('div')
  scream.innerHTML = '🩸 THEY\'RE COMING 🩸'
  scream.style.cssText = `position:fixed;top:20%;left:50%;transform:translateX(-50%);font-family:'Oswald',sans-serif;font-size:2.5rem;font-weight:700;color:#8b0000;letter-spacing:6px;text-transform:uppercase;z-index:10000;pointer-events:none;opacity:0;transition:opacity 0.3s ease;text-shadow:0 0 30px rgba(139,0,0,0.8);white-space:nowrap;`
  document.body.appendChild(scream)
  setTimeout(() => scream.style.opacity = '1', 300)

  setTimeout(() => {
    walker.style.left = '120%'
    walker.style.fontSize = '6rem'
    overlay.style.background = 'rgba(0,0,0,0)'
    scream.style.opacity = '0'
  }, 2000)

  setTimeout(() => {
    walker.remove()
    overlay.remove()
    scream.remove()
  }, 2500)
}

const projects = [
  { num: '01', title: 'TechZone Inventory System', desc: 'A group project built for a real hypothetical client — a full POS and inventory management system with analytics, and dual-database architecture.', tags: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'HTML/CSS'], link: 'https://github.com/sheilacheng04/Techzone-Inventory-system', linkLabel: '// GitHub', live: null },
  { num: '02', title: 'Mobile Personal Profile', desc: 'A mobile-responsive personal profile application built with Flutter, compiled into an APK — hands-on experience with cross-platform mobile development.', tags: ['Flutter', 'Dart', 'Mobile', 'APK'], link: 'https://github.com/Esprecion/MOBPROG-IT242-Personal-WEB', linkLabel: '// GitHub', live: null },
  { num: '03', title: 'Ramsey', desc: 'A storyboarding project centered on the school mascot — developing narrative, character design, and the groundwork for a potential future game.', tags: ['Storyboard', 'Game Design', 'Canva'], link: 'https://www.canva.com/design/DAHBxEUdnAk/Be8HYycsTbgTRm6tpjP6dg/edit', linkLabel: '// View on Canva', live: null },
]

const skillGroups = [
  { label: 'Frontend', icon: '⚡', items: ['Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'Flutter'] },
  { label: 'Backend', icon: '⚙', items: ['Node.js', 'NestJS', 'Express', 'REST APIs'] },
  { label: 'Database', icon: '🗄', items: ['Supabase', 'PostgreSQL', 'MongoDB', 'MySQL'] },
  { label: 'Tools', icon: '🔧', items: ['Git', 'GitHub', 'Vite', 'Vercel', 'VS Code', 'Canva'] },
]

onMounted(() => window.addEventListener('keydown', handleKonami))
onUnmounted(() => window.removeEventListener('keydown', handleKonami))
</script>

<style scoped>
.home { overflow: hidden; }

/* ── HERO ──────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    linear-gradient(rgba(10,10,8,0.78), rgba(10,10,8,0.9)),
    url('https://i.pinimg.com/736x/aa/c0/80/aac080118e4fd9205346b0965d78d94c.jpg')
    center/cover no-repeat;
}
.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 80% 50%, rgba(139,0,0,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 50%);
  pointer-events: none;
}
.hero-scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0,0,0,0.03) 2px,
    rgba(0,0,0,0.03) 4px
  );
  pointer-events: none;
}
.hero-inner { position: relative; z-index: 1; padding: 100px 24px 80px; }
.hero-stamp {
  font-family: var(--font-typewriter);
  font-size: 0.75rem;
  color: var(--gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 24px;
  animation: fadeUp 0.6s ease both;
  display: flex;
  align-items: center;
  gap: 8px;
}
.hero-title {
  font-family: var(--font-title);
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
  animation: fadeUp 0.6s 0.1s ease both;
}
.hero-name { color: var(--gold2); }
.hero-role { color: var(--blood2); }
.hero-rule {
  width: 80px;
  height: 2px;
  background: var(--blood);
  margin: 18px 0;
  animation: fadeUp 0.6s 0.15s ease both;
}
.hero-sub {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 500px;
  margin-bottom: 36px;
  line-height: 1.7;
  font-weight: 300;
  animation: fadeUp 0.6s 0.2s ease both;
}
.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: fadeUp 0.6s 0.3s ease both;
}
.hero-stats {
  display: flex;
  gap: 40px;
  margin-top: 64px;
  animation: fadeUp 0.6s 0.4s ease both;
}
.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-num {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.9rem;
  line-height: 1;
  color: var(--blood2);
}
.stat-label {
  font-family: var(--font-typewriter);
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 1px;
}
.hero-corner {
  position: absolute;
  font-family: var(--font-typewriter);
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: var(--text-muted);
  opacity: 0.4;
}
.hero-corner-tl { top: 20px; left: 24px; }
.hero-corner-br { bottom: 20px; right: 24px; }

/* ── ABOUT ─────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 60px;
  align-items: start;
}
.about-img-wrap { position: relative; }
.about-img-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}
.about-img-placeholder {
  width: 100%;
  height: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--text-muted);
}
.about-img-icon { font-size: 2rem; color: var(--blood2); opacity: 0.4; }
.about-img-text { font-family: var(--font-typewriter); font-size: 0.8rem; letter-spacing: 2px; }
.about-img-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: var(--gold);
  border-style: solid;
}
.about-img-corner-tl { top: -4px; left: -4px; border-width: 2px 0 0 2px; }
.about-img-corner-br { bottom: -4px; right: -4px; border-width: 0 2px 2px 0; }
.about-tag {
  font-family: var(--font-typewriter);
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--gold);
  text-align: center;
  margin-top: 12px;
  opacity: 0.6;
  text-transform: uppercase;
}
.about-content p { color: var(--text-muted); line-height: 1.8; font-weight: 300; }
.about-content strong { color: var(--text); }
.about-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.badge {
  font-family: var(--font-typewriter);
  font-size: 0.72rem;
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.35);
  padding: 3px 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ── PROJECTS ──────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 2px solid var(--blood);
  padding: 28px;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(139,0,0,0.05) 0%, transparent 60%);
  pointer-events: none;
}
.project-card:hover {
  border-color: var(--blood2);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139,0,0,0.15);
}
.project-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}
.project-number {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: var(--blood);
  opacity: 0.35;
  line-height: 1;
}
.project-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.tag {
  font-family: var(--font-typewriter);
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  background: rgba(139,0,0,0.15);
  color: var(--text-muted);
  border: 1px solid rgba(139,0,0,0.25);
}
.project-card h3 {
  font-family: var(--font-title);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: var(--text);
}
.project-card p { color: var(--text-muted); font-size: 0.88rem; line-height: 1.65; font-weight: 300; }
.project-links { display: flex; gap: 16px; margin-top: 20px; }
.project-link {
  font-family: var(--font-typewriter);
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: color var(--transition);
}
.project-link:hover { color: var(--gold); }
.project-link-live:hover { color: var(--blood2); }

/* ── SKILLS ────────────────────────── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
.skill-group {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 24px;
  transition: border-color var(--transition);
}
.skill-group:hover { border-color: var(--border2); }
.skill-group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.skill-group-icon { font-size: 1rem; }
.skill-group-label {
  font-family: var(--font-title);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.skill-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  font-family: var(--font-typewriter);
  background: var(--bg2);
  border: 1px solid var(--border);
  padding: 4px 10px;
  font-size: 0.78rem;
  color: var(--text-muted);
  transition: border-color var(--transition), color var(--transition);
}
.chip:hover { border-color: var(--gold); color: var(--gold); }

/* ── QUOTE BANNER ──────────────────── */
.quote-banner {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 48px 0;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}
.quote-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(139,0,0,0.06), transparent 50%, rgba(139,0,0,0.06));
}
.twd-quote {
  font-family: var(--font-typewriter);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: var(--text-muted);
  text-align: center;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  font-style: italic;
}
.quote-attr {
  display: block;
  font-size: 0.78rem;
  color: var(--blood2);
  margin-top: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-style: normal;
  font-family: var(--font-title);
  font-weight: 500;
}

/* ── RESPONSIVE ────────────────────── */
@media (max-width: 768px) {
  .hero { min-height: auto; }
  .hero-stats { gap: 24px; flex-wrap: wrap; }
  .about-grid { grid-template-columns: 1fr; gap: 32px; }
  .about-img-frame { max-width: 200px; margin: 0 auto; }
}
@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .btn { text-align: center; justify-content: center; }
}
</style>
