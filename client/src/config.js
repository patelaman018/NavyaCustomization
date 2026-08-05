// Base URL of the backend API.
// - Local dev: defaults to the Express server on port 5001, so the contact form
//   and admin dashboard work against a running backend.
// - Production (static GitHub Pages): empty, because Pages cannot host the backend.
//   The UI falls back gracefully (contact form shows a phone/WhatsApp message).
// - To enable a real backend later (e.g. Render), set VITE_API_URL at build time.
export const API_BASE =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:5001' : '');
