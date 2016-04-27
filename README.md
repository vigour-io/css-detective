# css-detective

Find all `@import`s by walking the AST (similar to and inspired by [detective](https://github.com/substack/node-detective), but for CSS)

<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/css-detective.svg?branch=master)](https://travis-ci.org/vigour-io/css-detective)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/css-detective.svg)](https://badge.fury.io/js/css-detective)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/css-detective/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/css-detective?branch=master)

<!-- VDOC END -->

# example

## strings

style.css:

``` js
@import 'a';
@import 'b';
@import 'c';
```

strings.js:

``` js
var cssDetective = require('css-detective')
var fs = require('fs')

var src = fs.readFileSync(__dirname + '/style.css')
var imports = cssDetective(src)
console.dir(imports)
```

output:

```
$ node examples/strings.js
[ 'a', 'b', 'c' ]
```

# methods

``` js
var cssDetective = require('css-detective')
```

## cssDetective(src, opts)

Give some source body `src`, return an array of all the `@import`s.

The options parameter `opts` is passed along to `cssDetective.find()`.

## var found = cssDetective.find(src, opts)

Give some source body `src`, return `found` with:

* `found.strings` - an array of each string found in an `@import`
* `found.nodes` (when `opts.nodes === true`) - an array of AST nodes for each
argument found in an `@import`

Optionally:

* `opts.nodes` - when `true`, populate `found.nodes`
* `opts.isImport(node)` - a function returning whether an AST node is an import
* `opts.parse` - supply options directly to
[postcss](https://npmjs.org/package/postcss)

# install

With [npm](https://npmjs.org) do:

```
npm install css-detective
```

# license

ISC