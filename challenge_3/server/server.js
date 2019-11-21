const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/createaccount', (req, res) => {
  controller.createAccount(req, res);
});

app.post('/updateaccount', (req, res) => {
  controller.createAccount(req, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));