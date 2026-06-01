const fs = require('fs');
const files = ['scratch/temp_data.js', 'scratch/temp_val_data.js'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /\{\s*"id":\s*"yilmaz-guney"[\s\S]*?"image":\s*"[^"]+"\s*\},?\s*/;
    let newContent = content.replace(regex, '');
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Removed from', file);
});
