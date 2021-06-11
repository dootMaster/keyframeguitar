const string = require('./strings.js');

const standard = [
  string.E4, string.B3, string.G3, string.D3, string.A2, string.E2,
]

const stupidTuning = [
  JSON.parse(JSON.stringify(string.A2)), JSON.parse(JSON.stringify(string.A2)), JSON.parse(JSON.stringify(string.A2)), JSON.parse(JSON.stringify(string.A2)), JSON.parse(JSON.stringify(string.A2)), JSON.parse(JSON.stringify(string.A2)),
]
const sevenStringB = [
  string.E4, string.B3, string.G3, string.D3, string.A2, string.E2, string.B1
]
module.exports = { standard, sevenStringB, stupidTuning };

