# Server: Email endpoint


This small Express server exposes a single endpoint `POST /api/send-email` that accepts the contact form data and sends it using the EmailJS HTTP API (recommended) or SMTP (legacy).

Setup

1. Copy `server/.env.example` → `server/.env` and fill either the EmailJS variables or the SMTP variables.
2. Install deps:

```bash
cd server
npm install
```

3. Run server in development:

```bash
npm run dev
```

It listens on port `4000` by default. From the frontend, set `VITE_API_BASE` to `http://localhost:4000` (or leave blank if proxied).

EmailJS vs SMTP

- EmailJS: set `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_USER_ID` (or `EMAILJS_PUBLIC_KEY`). Optionally set `EMAILJS_PRIVATE_KEY` if required by your EmailJS setup.
- SMTP: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `TO_EMAIL`.

Security

- Keep credentials secret and do not commit `server/.env` to git.
- For production, set the environment variables in your host provider instead of using `.env` files.
