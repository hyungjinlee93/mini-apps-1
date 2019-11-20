const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const converter = require('./converter');
const fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, './client')));

app.post('/formcsv', (req, res) => {
  let report = converter(req.body);
  fs.writeFile('./public/report.csv', report, (err) => {
    if (err) {
      throw err;
    } else {
      res.status(202).send('success');
    }
  })
});

app.get('/report.csv', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './public/report.csv'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));