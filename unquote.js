'use strict'

module.exports = exports = function unquote (str) {
  return str.replace(/['"]/g, '')
}
