'use strict'

var postcss = require('postcss')
var unquote = require('./unquote')

/**
 * @id cssDetective
 * @function cssDetective
 * @param src {string} - Same as `src` parameter of [find](#var-found--findsrc-opts)
 * @param opts {object} - Same as `opts` parameter of [find](#var-found--findsrc-opts)
 * Same as `require('css-detective').find(src, opts).strings`
 * See `find` below
 * @returns strings {array}
 */
module.exports = exports = function (src, opts) {
  return exports.find(src, opts).strings
}

/**
 * @id find
 * @function find
 * @param src {string} - Source css body (anything [postcss](https://npmjs.org/package/postcss) can parse). Can be a string or anything with a `toString` method
 * @param [opts] {object} - An object with any of the following options:
 * - + **opts.nodes** (*boolean*) - when `true`, populates `found.nodes`
 * - + **opts.parse** (*object*) - options to provide directly to
 [postcss's `parse` method](https://github.com/postcss/postcss/blob/master/docs/api.md#postcssparsecss-opts)
 * @returns found {object} - returns `found` with:
 * - + **found.strings** (*array*) - each string found in an `@import`
 * - + **found.nodes** (*array*|*undefined*) - AST `@import` nodes found if `opts.nodes === true`, `undefined` otherwise
 */
exports.find = function (src, opts) {
  if (!opts) {
    opts = {}
  }

  if (typeof src !== 'string') {
    src = String(src)
  }

  var imports = {
    strings: []
  }
  if (opts.nodes) {
    imports.nodes = []
  }

  if (!exports.importRe.test(src)) {
    return imports
  }

  var ast = exports.parse(src, opts.parse)

  exports.walk(ast, imports, opts)

  return imports
}

exports.walk = function walk (node, imports, opts) {
  if (Array.isArray(node)) {
    for (let i = 0, len = node.length; i < len; i += 1) {
      walk(node[i], imports, opts)
    }
  } else if (exports.isNode(node)) {
    if (exports.isImport(node)) {
      imports.strings.push(unquote(node.params))
      if (opts.nodes) {
        imports.nodes.push(node)
      }
    } else if (node.nodes && node.nodes.length) {
      walk(node.nodes, imports, opts)
    }
  }
}

exports.importRe = /@import\b/

exports.parse = function parse (src, opts) {
  if (!opts) {
    opts = {}
  }
  return postcss.parse(src, {
    from: opts.from
  })
}

exports.isNode = function isNode (value) {
  return value &&
    typeof value === 'object' &&
    typeof value.type === 'string' &&
    typeof value.source === 'object'
}

exports.isImport = function isImport (node) {
  return node.type === 'atrule' && node.name === 'import'
}
