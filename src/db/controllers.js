const SaveKFG = require('./models.js');

const findAllIds = (req) => {
  console.log('controllers findAllIds')
  return SaveKFG.find({}).distinct('_id');
}

const loadOneUserPreset = (req) => {
  console.log('controllers loadOneUserPreset')
  const saveName = req.params._id;
  console.log(saveName);
  return SaveKFG.findById(saveName);
}

const saveOne = (req) => {
  console.log('controllers saveOne')
  const { _id, diagram } = req.body;
  return SaveKFG.create({_id: _id, diagram: diagram});
}

const deleteOneUserPreset = (req) => {
  console.log('controllers DELETE')
  const deleteName = req.params._id;
  return SaveKFG.deleteOne({_id: deleteName});
}


module.exports = { findAllIds, saveOne, loadOneUserPreset, deleteOneUserPreset };