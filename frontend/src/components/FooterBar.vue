<template>
  <footer class="footer">
    <div class="blood-line-top"></div>
    <div class="container footer-inner">
      <p class="footer-copy">
        <span class="footer-icon">☣</span>
        © {{ year }} Ashlee Dan Esprecion &nbsp;·&nbsp; Built with Vue.js + NestJS + Supabase &nbsp;·&nbsp;
        <span class="footer-quote">"We are the walking dead."</span>
      </p>
      <div class="footer-links">
        <a href="https://github.com/Esprecion" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/ashlee-esprecion-52b668325/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer { border-top: 1px solid var(--border); padding: 28px 0; margin-top: 80px; }
.blood-line-top { height: 1px; background: linear-gradient(to right, transparent, var(--blood), transparent); opacity: 0.35; }
.footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 20px; }
.footer-copy { font-family: var(--font-typewriter); color: var(--text-muted); font-size: 0.8rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.footer-icon { color: var(--blood2); }
.footer-quote { color: var(--gold); font-style: italic; opacity: 0.7; }
.footer-links { display: flex; gap: 20px; }
.footer-links a { font-family: var(--font-title); font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); transition: color var(--transition); }
.footer-links a:hover { color: var(--gold); }
</style>
