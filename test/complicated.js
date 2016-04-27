var test = require('tape')
var cssDetective = require('../')

var sources = [
  '@import "a";',
  ';@import "a";',
  ' @import "a";',
  '/*comments*/@import "a";',

  '@import /*comments*/"a"',
  '@import/*comments*/ "a"',
  '@import /*comments*/ "a"',
  ';@import /*comments*/"a";',
  ';@import/*comments*/ "a";',
  ';@import /*comments*/ "a";',
  ' @import /*comments*/"a";',
  ' @import/*comments*/ "a";',
  ' @import /*comments*/ "a";',
  '/*comments*/@import /*comments*/"a";',
  '/*comments*/@import/*comments*/ "a";',
  '/*comments*/@import /*comments*/ "a";',

  '@import /*comments*/ /*more comments*/ "a";',
  ';@import /*comments*/ /*more comments*/ "a";',
  ' @import /*comments*/ /*more comments*/ "a";',
  ' /*comments*/ /*more comments*/ @import /*comments*/ /*more comments*/ "a";'
]

test('complicated', function (t) {
  t.plan(sources.length)
  sources.forEach(function (src) {
    t.deepEqual(cssDetective(src), [ 'a' ])
  })
})
