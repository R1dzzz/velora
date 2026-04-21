# Velora v3 — Single-File HTML + Vercel API

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Velora v3"
git remote add origin https://github.com/youruser/velora-v3.git
git push -u origin main
```

### 2. Import to Vercel
- Go to https://vercel.com/new
- Import your GitHub repo
- Framework Preset: **Other**
- Build Command: `bash build.sh`
- Output Directory: `.` (root)

### 3. Add Environment Variables in Vercel Dashboard
| Variable | Value |
|---|---|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### 4. Supabase Setup
1. Go to your Supabase project → Authentication → Providers
2. Enable **Email** (with email confirmations ON)
3. Enable **Google** OAuth (add credentials)
4. Authentication → URL Configuration:
   - Add your Vercel URL to Redirect URLs: `https://your-app.vercel.app`

### 5. Redeploy
After adding env vars, trigger a redeploy from the Vercel dashboard.

---

## Project Structure
```
velora-deploy/
├── index.html       ← Full app (single HTML file, all CSS + JS inline)
├── api/
│   └── chat.js      ← Vercel serverless: proxies OpenRouter, hides API key
├── build.sh         ← Injects Supabase env vars into HTML at build time
├── vercel.json      ← Routing config
├── package.json     ← Build command
└── .env.example     ← Copy to .env.local for local dev
```

## Local Development
```bash
# Install Vercel CLI
npm i -g vercel

# Create .env.local from example
cp .env.example .env.local
# Fill in your keys

# Run locally
vercel dev
```
