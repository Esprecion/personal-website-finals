# personal-website-finals

A Walking Dead-themed personal portfolio — full-stack web application.

## Stack
- **Frontend:** Vue.js 3 + Vue Router + Vite (hosted on Vercel)
- **Backend:** NestJS + REST API (hosted on Vercel)
- **Database:** Supabase (PostgreSQL)

## Features
- TWD-inspired dark, gritty design
- Mobile & desktop responsive
- Guestbook with GET and POST (NestJS ↔ Supabase)
- Smooth page transitions

## Setup

### Frontend
```bash
cd frontend
cp .env.example .env    # set VITE_API_URL
npm install
npm run dev
```

### Backend
```bash
cd backend
cp .env.example .env    # set SUPABASE_URL and SUPABASE_ANON_KEY
npm install
npm run start:dev
```

### Supabase Table
```sql
create table guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  message text not null,
  created_at timestamptz default now()
);
```

## Deploy
- Frontend → Vercel (connect `frontend/` folder, set `VITE_API_URL` env var)
- Backend → Vercel (connect `backend/` folder, set `SUPABASE_URL` + `SUPABASE_ANON_KEY` env vars)
