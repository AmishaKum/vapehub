# The Vape Hub — Homepage

Homepage for The Vape Hub, Pueblo, CO. Express + TypeScript backend serves the static frontend and a small API.

- Frontend: HTML, CSS, JS · GSAP ScrollTrigger (scroll-scrubbed product film) · Motion (Framer Motion's vanilla engine)
- Backend: Node + Express (TypeScript) — `GET /api/products`, `POST /api/newsletter`, `GET /api/health`

## Run
    npm install && npm run dev   # http://localhost:3000

## Deploy (Render)
New → Blueprint → pick this repo (uses `render.yaml`), or a Web Service with
build `npm install --include=dev && npm run build`, start `npm start`.
