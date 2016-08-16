var fs = require('fs');

fs.writeFileSync(
  'index.js',
  fs.readFileSync('html-class.js').toString().replace(
    /\/\*\s*require:([^\s]+?)\s*\*\//g,
    function ($0, $1) {
      return fs.readFileSync($1).toString();
    }
  )
);