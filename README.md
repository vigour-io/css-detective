<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/css-detective.svg?branch=master)](https://travis-ci.org/vigour-io/css-detective)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/css-detective.svg)](https://badge.fury.io/js/css-detective)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/css-detective/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/css-detective?branch=master)

<!-- VDOC END -->

css-detective
====

Find all `@import`s by walking the AST

Similar to, and inspired by [detective](https://github.com/substack/node-detective). Uses [postcss](https://npmjs.org/package/postcss) to parse the CSS into an abstract syntax tree (AST), so some level of invalid CSS is supported.

<!-- VDOC.jsdoc cssDetective -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var strings = cssDetective(src, opts)
- **src** (*string*) - Same as `src` parameter of [find](#var-found--findsrc-opts)
- **opts** (*object*) - Same as `opts` parameter of [find](#var-found--findsrc-opts)

Same as `require('css-detective').find(src, opts).strings`

See `find` below

<!-- VDOC END -->

``` js
var cssDetective = require('css-detective')
cssDetective('@import "a";\n@import "b";')
// ['a', 'b']
```

<!-- VDOC.jsdoc find -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var found = find(src, [opts])
- **src** (*string*) - Source css body (anything [postcss](https://npmjs.org/package/postcss) can parse). Can be a string or anything with a `toString` method
- **[opts]** (*object*) - An object with any of the following options:

- + **opts.nodes** (*boolean*) - when `true`, populates `found.nodes`

- + **opts.parse** (*object*) - options to provide directly to

 [postcss's `parse` method](https://github.com/postcss/postcss/blob/master/docs/api.md#postcssparsecss-opts)
- **returns** (*object*) found - returns `found` with:

- + **found.strings** (*array*) - each string found in an `@import`

- + **found.nodes** (*array*|*undefined*) - AST `@import` nodes found if `opts.nodes === true`, `undefined` otherwise

<!-- VDOC END -->

``` js
var cssDetective = require('css-detective')
cssDetective.find('@import "a";\n@import "b";')
// { strings: ['a', 'b'] }
```
