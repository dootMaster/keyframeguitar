const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../docs')));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;