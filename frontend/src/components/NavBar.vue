<template>
  <nav class="navbar">
    <div class="nav-inner container">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">☣</span>
        <span class="logo-text">SHURLEE<span class="logo-dot">.</span></span>
      </RouterLink>
      <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><RouterLink to="/" @click="menuOpen=false">Home</RouterLink></li>
        <li><a href="/#about" @click="menuOpen=false">About</a></li>
        <li><a href="/#projects" @click="menuOpen=false">Projects</a></li>
        <li><a href="/#skills" @click="menuOpen=false">Skills</a></li>
        <li><RouterLink to="/guestbook" class="nav-cta" @click="menuOpen=false">Guestbook</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 8, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.navbar::after {
  content: '';
  display: block;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--blood), transparent);
  opacity: 0.4;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
}
.logo-icon { color: var(--blood2); font-size: 1.2rem; animation: flicker 6s infinite; }
.logo-dot { color: var(--blood2); }
.nav-links { list-style: none; display: flex; align-items: center; gap: 28px; }
.nav-links a {
  font-family: var(--font-title);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--transition);
}
.nav-links a:hover, .nav-links a.router-link-active { color: var(--text); }
.nav-cta {
  background: var(--blood) !important;
  color: var(--text) !important;
  padding: 7px 18px !important;
  border: 1px solid var(--blood2) !important;
}
.nav-cta:hover { background: var(--blood2) !important; }
.menu-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 4px; }
.menu-toggle span { display: block; width: 22px; height: 2px; background: var(--text); transition: var(--transition); }
@media (max-width: 768px) {
  .menu-toggle { display: flex; }
  .nav-links {
    display: none;
    position: absolute;
    top: 64px; left: 0; right: 0;
    background: var(--bg2);
    flex-direction: column;
    padding: 24px; gap: 20px;
    border-bottom: 1px solid var(--border);
  }
  .nav-links.open { display: flex; }
  .nav-links a { font-size: 1rem !important; }
}
</style>
