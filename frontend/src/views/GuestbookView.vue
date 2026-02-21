<template>
  <div class="guestbook-page">
    <div class="container">

      <div class="page-header">
        <div class="section-label">// radio tower — open channel</div>
        <h1 class="page-title">GUESTBOOK<span class="title-accent">.</span></h1>
        <p class="page-sub">Send a signal. Leave your mark. Every survivor's message matters.</p>
        <div class="page-rule"></div>
      </div>

      <!-- FORM -->
      <div class="form-card">
        <div class="form-card-header">
          <span class="form-card-icon">📡</span>
          <h2>Broadcast a Message</h2>
          <div class="form-card-stamp">OPEN CHANNEL</div>
        </div>
        <form @submit.prevent="submitEntry" class="entry-form" novalidate>
          <div class="form-field">
            <label for="name">Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Your survivor name"
              :class="{ error: errors.name }"
              maxlength="60"
            />
            <span class="field-error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div class="form-field">
            <label for="message">Message *</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="What's on your mind, survivor?"
              rows="4"
              :class="{ error: errors.message }"
              maxlength="500"
            ></textarea>
            <div class="char-count">{{ form.message.length }}/500</div>
            <span class="field-error" v-if="errors.message">{{ errors.message }}</span>
          </div>
          <button type="submit" class="btn btn-primary submit-btn" :disabled="submitting">
            <span v-if="submitting">☣ Transmitting...</span>
            <span v-else>☠ Broadcast Message →</span>
          </button>
          <div class="success-toast" v-if="successMsg">{{ successMsg }}</div>
          <div class="error-toast" v-if="globalError">{{ globalError }}</div>
        </form>
      </div>

      <!-- ENTRIES -->
      <div class="entries-section">
        <div class="entries-header">
          <div>
            <div class="section-label">// incoming signals</div>
            <h2 class="entries-title">Messages <span class="entries-count">({{ entries.length }})</span></h2>
          </div>
          <button class="refresh-btn" @click="loadEntries" :disabled="loading">
            {{ loading ? '☣ Loading...' : '↻ Refresh' }}
          </button>
        </div>

        <div class="loading-state" v-if="loading && entries.length === 0">
          <div class="spinner"></div>
          <p>Scanning for signals...</p>
        </div>

        <div class="empty-state" v-else-if="!loading && entries.length === 0">
          <span class="empty-icon">📭</span>
          <p>No transmissions received. Be the first to broadcast.</p>
        </div>

        <div class="entries-list" v-else>
          <div class="entry-card" v-for="entry in entries" :key="entry.id">
            <div class="entry-header">
              <div class="entry-avatar">{{ getInitial(entry.name) }}</div>
              <div class="entry-meta">
                <span class="entry-name">{{ entry.name }}</span>
                <span class="entry-date">{{ formatDate(entry.created_at) }}</span>
              </div>
              <div class="entry-signal">▐▌▐</div>
            </div>
            <p class="entry-msg">{{ entry.message }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getEntries, createEntry } from '../services/api.js'

const entries = ref([])
const loading = ref(false)
const submitting = ref(false)
const successMsg = ref('')
const globalError = ref('')

const form = reactive({ name: '', message: '' })
const errors = reactive({ name: '', message: '' })

async function loadEntries() {
  loading.value = true
  globalError.value = ''
  try {
    const res = await getEntries()
    entries.value = res.data || []
  } catch (e) {
    globalError.value = 'Signal lost. Failed to load messages.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function validate() {
  errors.name = ''
  errors.message = ''
  let valid = true
  if (!form.name.trim()) { errors.name = 'Name is required.'; valid = false }
  if (!form.message.trim()) { errors.message = 'Message is required.'; valid = false }
  else if (form.message.trim().length < 3) { errors.message = 'Message too short.'; valid = false }
  return valid
}

async function submitEntry() {
  if (!validate()) return
  submitting.value = true
  successMsg.value = ''
  globalError.value = ''
  try {
    await createEntry({ name: form.name.trim(), message: form.message.trim() })
    successMsg.value = '✓ Signal received. Message broadcast successfully.'
    form.name = ''
    form.message = ''
    await loadEntries()
    setTimeout(() => { successMsg.value = '' }, 4000)
  } catch (e) {
    globalError.value = 'Transmission failed. Please try again.'
    console.error(e)
  } finally {
    submitting.value = false
  }
}

function getInitial(name) { return name ? name.charAt(0).toUpperCase() : '?' }
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

onMounted(loadEntries)
</script>

<style scoped>
.guestbook-page { padding: 60px 0 80px; }
.page-header { text-align: center; margin-bottom: 52px; }
.section-label {
  font-family: var(--font-typewriter);
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
  opacity: 0.8;
}
.page-title {
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 12px;
  line-height: 1;
}
.title-accent { color: var(--blood2); }
.page-sub { color: var(--text-muted); font-size: 0.95rem; font-family: var(--font-typewriter); letter-spacing: 1px; }
.page-rule { width: 60px; height: 2px; background: var(--blood); margin: 20px auto 0; }

.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 2px solid var(--blood);
  padding: 36px;
  max-width: 700px;
  margin: 0 auto 52px;
}
.form-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}
.form-card-icon { font-size: 1.2rem; }
.form-card-header h2 {
  font-family: var(--font-title);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  flex: 1;
}
.form-card-stamp {
  font-family: var(--font-typewriter);
  font-size: 0.65rem;
  color: var(--gold);
  border: 1px solid rgba(201,168,76,0.4);
  padding: 3px 8px;
  letter-spacing: 2px;
  opacity: 0.7;
}
.form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-field label {
  font-family: var(--font-title);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.form-field input,
.form-field textarea {
  background: var(--bg2);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 12px 14px;
  border-radius: 0;
  font-family: var(--font-typewriter);
  font-size: 0.92rem;
  transition: border-color var(--transition);
  resize: vertical;
  outline: none;
}
.form-field input:focus,
.form-field textarea:focus { border-color: var(--blood); }
.form-field input.error,
.form-field textarea.error { border-color: var(--blood2); }
.field-error { font-size: 0.75rem; color: var(--blood2); font-family: var(--font-typewriter); }
.char-count { font-size: 0.72rem; color: var(--text-muted); text-align: right; margin-top: 2px; font-family: var(--font-typewriter); }
.submit-btn { margin-top: 4px; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.success-toast {
  margin-top: 14px;
  background: rgba(139,0,0,0.1);
  border: 1px solid rgba(139,0,0,0.3);
  color: var(--text-muted);
  padding: 10px 16px;
  font-family: var(--font-typewriter);
  font-size: 0.88rem;
}
.error-toast {
  margin-top: 14px;
  background: rgba(139,0,0,0.15);
  border: 1px solid rgba(139,0,0,0.4);
  color: var(--blood2);
  padding: 10px 16px;
  font-family: var(--font-typewriter);
  font-size: 0.88rem;
}

.entries-section { max-width: 700px; margin: 0 auto; }
.entries-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; }
.entries-title {
  font-family: var(--font-title);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.entries-count { color: var(--blood2); font-size: 0.9rem; }
.refresh-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 7px 16px;
  font-family: var(--font-typewriter);
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: all var(--transition);
}
.refresh-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
.refresh-btn:disabled { opacity: 0.5; cursor: default; }
.loading-state, .empty-state {
  text-align: center;
  padding: 52px;
  color: var(--text-muted);
  font-family: var(--font-typewriter);
}
.spinner {
  width: 28px; height: 28px;
  border: 2px solid var(--border);
  border-top-color: var(--blood);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}
.empty-icon { font-size: 2.5rem; display: block; margin-bottom: 12px; }
.entries-list { display: flex; flex-direction: column; gap: 14px; }
.entry-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--blood);
  padding: 20px 24px;
  animation: fadeUp 0.4s ease both;
  transition: border-color var(--transition);
}
.entry-card:hover { border-left-color: var(--blood2); }
.entry-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.entry-avatar {
  width: 36px; height: 36px;
  background: var(--blood);
  color: var(--text);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
  font-family: var(--font-title);
  font-size: 1rem;
  flex-shrink: 0;
  letter-spacing: 1px;
}
.entry-meta { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.entry-name { font-family: var(--font-title); font-weight: 600; font-size: 0.92rem; letter-spacing: 1px; text-transform: uppercase; }
.entry-date { font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-typewriter); }
.entry-signal { font-family: var(--font-typewriter); font-size: 0.7rem; color: var(--blood2); opacity: 0.5; }
.entry-msg { color: var(--text-muted); font-size: 0.9rem; line-height: 1.65; font-family: var(--font-typewriter); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 0;
  font-family: var(--font-title);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all var(--transition);
  border: 2px solid transparent;
}
.btn-primary { background: var(--blood); color: var(--text); border-color: var(--blood); }
.btn-primary:hover:not(:disabled) { background: var(--blood2); transform: translateY(-1px); }
</style>
