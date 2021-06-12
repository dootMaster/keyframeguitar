const express = require('express');
const app = express();
// const cors = require('cors');
const controllers = require('../src/db/controllers.js');
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// }
// app.use('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/id', (req, res) => {
  controllers.findAllIds(req)
    .catch((err) => {res.status(404).send(err)})
    .then((data) => {res.status(200).send(data)})
})

app.get('/getUserPreset/:_id', (req, res) => {
  controllers.loadOneUserPreset(req)
    .catch((err) => {res.status(404).send(err)})
    .then((data) => {res.status(200).send(data)})
})

app.post('/', (req, res) => {
  controllers.saveOne(req)
    .catch((err) => {res.status(404).send(err)})
    .then((data) => {res.status(200).send(data)})
})

app.delete('/delete/:_id', (req, res) => {
  controllers.deleteOneUserPreset(req)
    .catch((err) => {res.status(404).send(err)})
    .then((data) => {res.status(200).send(data)})
}) //db.savekfgs.drop() to clear all presets

app.delete('/killThemAll666', (req, res) => {
  controllers.deleteAll()
    .catch((err) => {res.status(404).send(err)})
    .then((data) => {res.status(200).send(data)})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;