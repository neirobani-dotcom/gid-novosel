import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ftp = require('vinyl-ftp');
const vfs = require('vinyl-fs');

const conn = ftp.create({
  host: '141.8.197.99',
  port: 21,
  user: 'a1269574',
  password: 'egadguzaez',
  parallel: 5,
  log: console.log
});

vfs.src(['dist/**'], { base: 'dist', buffer: false })
  .pipe(conn.dest('/public_html'));
