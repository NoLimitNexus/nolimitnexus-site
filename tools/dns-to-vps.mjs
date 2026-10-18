// Point nolimitnexus.com and www.nolimitnexus.com at the VPS (A 78.47.24.143, DNS-only so Caddy can issue
// its certificate). Before 2026-10-18 both were proxied CNAMEs to the NAS Cloudflare Tunnel (e0abc422...).
// Reads CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID_NOLIMITNEXUS from D:\Projects\personal-claude-code\.env.
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(readFileSync('D:/Projects/personal-claude-code/.env', 'utf8').split(/\r?\n/)
  .filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim()]; }));
const token = env.CLOUDFLARE_API_TOKEN, zone = env.CLOUDFLARE_ZONE_ID_NOLIMITNEXUS;
if (!token || !zone) throw new Error('Cloudflare token or zone id missing in .env');

const records = { 'nolimitnexus.com': 'f1e92e3143fb1e13d08c158401ed1ef1', 'www.nolimitnexus.com': '708b26c79c9896df046ef23382acc3d5' };
for (const [name, id] of Object.entries(records)) {
  const r = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/dns_records/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'A', name, content: '78.47.24.143', ttl: 1, proxied: false,
      comment: 'VPS Caddy, landing page (2026-10-18); was CNAME to NAS tunnel e0abc422' }),
  });
  const j = await r.json();
  console.log(j.success ? `${j.result.type} ${j.result.name} -> ${j.result.content} ${j.result.proxied ? 'proxied' : 'dns-only'}` : JSON.stringify(j.errors));
}
