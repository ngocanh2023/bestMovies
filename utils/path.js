const path = require('path');

const pt = path.dirname(process.mainModule.filename);
console.log(pt);

module.exports = pt;