const string = require('./strings.js');

const standard = [
  JSON.parse(JSON.stringify(string.E)),
  JSON.parse(JSON.stringify(string.B)),
  JSON.parse(JSON.stringify(string.G)),
  JSON.parse(JSON.stringify(string.D)),
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.E)),
]

const stupidTuning = [
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.A)),
  JSON.parse(JSON.stringify(string.A)),
]
const sevenStringB = [
  string.E, string.B, string.G, string.D, string.A, string.E, string.B
]
module.exports = { standard, sevenStringB, stupidTuning };

