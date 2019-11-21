const model = require('./db/model.js');

module.exports.createAccount = (req, res) => {
  model.create(req.body, (err, result) => {
    if(err) {
      res.status(500).send();
    } else {
      res.status(201).send('SUCCESS');
    }
  });
}

module.exports.updateAccount = (req, res) => {
  model.update({email: req.body.email}, req.body, (err, result) => {
    if(err) {
      res.status(500).send();
    } else {
      res.status(202).send('SUCCESS');
    }
  });
}