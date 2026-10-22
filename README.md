# nolimitnexus.com

The professional landing page at the root of nolimitnexus.com. One static file, no build step.

- Live: https://nolimitnexus.com (served as files by Caddy on the VPS `nolimitnexus-1`, folder `/opt/stacks/caddy/www/nolimitnexus`)
- Preview: https://nolimitnexus.github.io/nolimitnexus-site/ (GitHub Pages from `main`)

Deploy: `node tools/deploy.mjs` uploads `index.html` to the server over SSH (root key `~/.ssh/nolimitnexus_vps`).

Nothing on this page names a project that is not public. Add a project only when the owner says it may be shown.

## The games page (unlisted)
`games/index.html` is served at https://nolimitnexus.com/games/ : a plain picker with a Play link to each game.
His ask (2026-10-22): under the main domain, but not linked from or seen on the main page for now. It carries
`noindex` so search engines leave it out. The deploy script uploads both pages.

Wayfarers is ONE entry, https://wayfarers.nolimitnexus.com/ and nothing under it. Its islands (the farm that was
Lakeside, Adventure Island, the Shooting Island, the Party RPG characters) never get their own card or link here or
anywhere: his rule, said several times (wayfarer-merge FOCUS.md, 2026-10-21), and repeated 2026-10-22 when this page
first listed Lakeside, Adventure Island and Party RPG separately.
