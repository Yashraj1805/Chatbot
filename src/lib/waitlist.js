// Pilot signup capture — posts to our own Vercel serverless function
// (`/api/lead`), which stores the signup in Postgres and optionally emails a
// notification. Same-origin, so no CORS workarounds needed.
//
// Locally (`npm run dev`) the /api route doesn't run, so this fails quietly and
// the form still proceeds. Use `vercel dev` to exercise the function locally.
const ENDPOINT = '/api/lead'

export async function saveLead(data) {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'web', ...data }),
    })
    return { ok: res.ok }
  } catch (err) {
    if (import.meta.env.DEV) console.error('[waitlist] save failed:', err)
    return { ok: false, error: err }
  }
}
