// Upload the landing page to the VPS. Caddy serves /opt/stacks/caddy/www/nolimitnexus at https://nolimitnexus.com.
//   node tools/deploy.mjs            (key: ~/.ssh/nolimitnexus_vps, user root)
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const key = process.env.VPS_KEY || join(homedir(), '.ssh', 'nolimitnexus_vps');
const host = 'root@78.47.24.143';
const dir = '/opt/stacks/caddy/www/nolimitnexus';
const ssh = (cmd) => execFileSync('ssh', ['-i', key, '-o', 'BatchMode=yes', host, cmd], { stdio: 'inherit' });

// games/ is the unlisted game picker at /games/ (nothing on the main page links to it).
const pages = ['index.html', 'games/index.html'];

ssh(`mkdir -p ${dir}/games`);
for (const page of pages) {
  execFileSync('scp', ['-i', key, '-o', 'BatchMode=yes', join(root, page), `${host}:${dir}/${page}`], { stdio: 'inherit' });
}
ssh(`chown -R deploy:deploy ${dir} && ls -la ${dir}`);
console.log('deployed to https://nolimitnexus.com');
