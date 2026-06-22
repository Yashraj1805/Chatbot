// Pilot waitlist capture — sends sign-up details to a Google Apps Script Web App
// that appends them as a row in a Google Sheet. No backend server needed.
//
// Set the endpoint in an env var (Vercel → Project → Settings → Environment
// Variables, and a local .env for dev):
//   VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
//
// If the var is unset, capture is skipped gracefully (the form still works).
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT

export async function saveLead(data) {
  if (!ENDPOINT) {
    // No endpoint configured yet — don't block the user, just log in dev.
    if (import.meta.env.DEV) console.warn('[waitlist] VITE_WAITLIST_ENDPOINT not set — skipped:', data)
    return { ok: false, skipped: true }
  }

  const payload = { source: 'web', ...data, ts: new Date().toISOString() }

  try {
    // `no-cors` + text/plain keeps it a "simple request" so the browser doesn't
    // block it — Apps Script accepts the POST and writes the row. The response
    // is opaque (can't be read), so we treat a completed request as success.
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    return { ok: true }
  } catch (err) {
    if (import.meta.env.DEV) console.error('[waitlist] save failed:', err)
    return { ok: false, error: err }
  }
}
