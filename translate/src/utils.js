const patterns = require('./pattern.js')

const guessIsZh = (value) => patterns.isZh.test(value)
module.exports = {
  guessIsZh
}