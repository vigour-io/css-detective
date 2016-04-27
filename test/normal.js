var test = require('tape')
var cssDetective = require('../')
var unquote = require('../unquote')
var path = require('path')
var fs = require('fs')
var src = fs.readFileSync(path.join(__dirname, 'files', 'style.css'))
var expected = [ 'a', 'b', 'c' ]
test('without nodes', function (t) {
  t.plan(2)
  var imports = cssDetective.find(src)
  t.deepEqual(imports.strings, expected)
  t.notOk(imports.nodes, 'has no nodes')
})

test('with nodes', function (t) {
  t.plan(2)
  var imports = cssDetective.find(src, { nodes: true })
  t.deepEqual(imports.strings, expected)
  t.deepEqual(
    imports.nodes.map(function (n) {
      return unquote(n.params)
    }),
    expected,
    'has a node for each import')
})
