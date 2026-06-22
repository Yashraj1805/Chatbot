// Vercel Serverless Function — receives a pilot signup from the /join form,
// stores it in Postgres, and (optionally) emails a notification. The DB
// connection string stays here on the server; it is never exposed to the
// browser. Configure via Vercel env vars:
//   DATABASE_URL    — Postgres connection string (Neon / Supabase / etc.)  [required to store]
//   RESEND_API_KEY  — Resend key for email alerts                          [optional]
//   NOTIFY_EMAIL    — where to send the alert (your inbox)                 [optional]
//   NOTIFY_FROM     — from address (default onboarding@resend.dev)         [optional]
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
// Reuse one pool across warm invocations.
const pool = connectionString
  ? new Pool({ connectionString, ssl: { rejectUnauthorized: false }, max: 3 })
  : null

let tableReady = false
async function ensureTable() {
  if (tableReady) return
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pilot_signups (
      id         BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      source     TEXT,
      name       TEXT,
      email      TEXT,
      company    TEXT
    )
  `)
  tableReady = true
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  body = body || {}

  const lead = {
    source: String(body.source || 'web').slice(0, 50),
    name: String(body.name || '').slice(0, 200),
    email: String(body.email || '').trim().slice(0, 200),
    company: String(body.company || '').slice(0, 200),
  }

  if (!lead.email || !lead.email.includes('@')) {
    return res.status(400).json({ ok: false, error: 'Valid email required' })
  }

  try {
    if (pool) {
      await ensureTable()
      await pool.query(
        'INSERT INTO pilot_signups (source, name, email, company) VALUES ($1, $2, $3, $4)',
        [lead.source, lead.name, lead.email, lead.company]
      )
    } else {
      console.warn('[lead] DATABASE_URL not set — signup not stored:', lead.email)
    }

    // Optional email notification — only if Resend is configured.
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      await notifyByEmail(lead).catch((e) => console.error('[lead] email failed:', e))
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[lead] insert failed:', err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}

async function notifyByEmail(lead) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'VartaBot <onboarding@resend.dev>',
      to: [process.env.NOTIFY_EMAIL],
      subject: `New pilot signup: ${lead.email}`,
      text: [
        `Email:   ${lead.email}`,
        `Name:    ${lead.name || '-'}`,
        `Company: ${lead.company || '-'}`,
        `Source:  ${lead.source}`,
      ].join('\n'),
    }),
  })
}
