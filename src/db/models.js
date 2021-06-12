const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kfg', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const kfgSchema = mongoose.Schema({
  _id: {type: String, minLength: 1, maxLength: 64},
  diagram: [],
})

const SaveKFG = mongoose.model('SaveKFG', kfgSchema);

module.exports = { SaveKFG, db };
