const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('js/data.js', 'utf8');
content = content.replace(/const /g, 'var ').replace(/let /g, 'var ');

const context = {};
vm.createContext(context);
vm.runInContext(content, context);

function findPath(obj, target, path = '') {
  if (typeof obj === 'string' && obj.includes(target)) {
    console.log(path);
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => findPath(item, target, `${path}[${index}]`));
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      findPath(obj[key], target, `${path}.${key}`);
    }
  }
}

findPath(context.FILMS_DATA, 'Apichatpong');
