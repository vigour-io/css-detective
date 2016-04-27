var cssDetective = require('../')
var fs = require('fs')

var src = fs.readFileSync(__dirname + '/style.css')
var imports = cssDetective(src)
console.dir(imports)
