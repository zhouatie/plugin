const patterns = require('./pattern.js')

const guessIsZh = (value) => patterns.isZh.test(value)
const formatText = (text, value) => value && text

module.exports = {
  guessIsZh,
  formatText
}