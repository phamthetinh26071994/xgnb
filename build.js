// Chạy lúc build trên Render: đọc biến môi trường -> ghi dist/config.js
// Biến: app1, app2, app3, ... (mỗi biến 1 link, không phân biệt hoa/thường)
// Tuỳ chọn: mode = fastest (mặc định) | random
const fs = require('fs');
const urls = Object.keys(process.env)
  .map(k => ({ k, m: k.match(/^app(\d+)$/i) }))
  .filter(x => x.m && process.env[x.k].trim())
  .sort((a, b) => Number(a.m[1]) - Number(b.m[1]))
  .map(x => process.env[x.k].trim().replace(/\/$/, ''));
const mode = (process.env.mode || process.env.MODE || 'fastest').trim().toLowerCase();
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/config.js',
  `window.CONFIG = ${JSON.stringify({ urls, mode })};`);
fs.copyFileSync('index.html', 'dist/index.html');
console.log('Built:', urls.length, 'urls, mode =', mode);
