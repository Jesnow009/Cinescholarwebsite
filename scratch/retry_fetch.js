const https = require('https');

function fetchJsonWithRetry(url, retries = 5) {
  return new Promise((resolve) => {
    const attempt = (n) => {
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch(e) {
            if (n > 0) setTimeout(() => attempt(n - 1), 1500);
            else resolve(null);
          }
        });
      }).on('error', e => {
        if (n > 0) setTimeout(() => attempt(n - 1), 1500);
        else resolve(null);
      });
      req.setTimeout(8000, () => {
        req.destroy();
        if (n > 0) setTimeout(() => attempt(n - 1), 1500);
        else resolve(null);
      });
    };
    attempt(retries);
  });
}

module.exports = { fetchJsonWithRetry };
