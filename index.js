'use strict'

var postcss = require('postcss')
var unquote = require('./unquote')

module.exports = exports = function (src, opts) {
  return exports.find(src, opts).strings
}

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
