const fs = require('fs');
const path = require('path');

const measurementId = 'G-PG3CJBRK3R';
const analyticsScript = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${measurementId}');
    </script>
</head>`;

let modifiedCount = 0;
const files = fs.readdirSync('.');

for (const file of files) {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Don't add if already exists
        if (!content.includes('gtag.js')) {
            // Replace the closing </head> tag with the script and the closing tag
            let newContent = content.replace('</head>', analyticsScript);
            
            if (content !== newContent) {
                fs.writeFileSync(file, newContent);
                modifiedCount++;
            }
        }
    }
}

console.log(`Successfully added Google Analytics tracking code to ${modifiedCount} HTML files.`);
