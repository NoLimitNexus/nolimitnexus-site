# nolimitnexus.com

The professional landing page at the root of nolimitnexus.com. One static file, no build step.

- Live: https://nolimitnexus.com (served as files by Caddy on the VPS `nolimitnexus-1`, folder `/opt/stacks/caddy/www/nolimitnexus`)
- Preview: https://nolimitnexus.github.io/nolimitnexus-site/ (GitHub Pages from `main`)

Deploy: `node tools/deploy.mjs` uploads `index.html` to the server over SSH (root key `~/.ssh/nolimitnexus_vps`).

Nothing on this page names a project that is not public. Add a project only when the owner says it may be shown.
