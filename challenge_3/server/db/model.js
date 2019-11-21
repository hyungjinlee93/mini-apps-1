var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

var orderSchema = new mongoose.Schema({
  addr: String,
  billingzip: String,
  cccvv: String,
  ccdate: String,
  ccnum: String,
  city: String,
  email: String,
  homezip: String,
  name: String,
  password: String,
  phone: String,
  state: String
});

var Order = mongoose.model('Order', orderSchema);

module.exports.create = (orderObj, cb) => {
  var cart = new Order(orderObj);
  cart.save(function (err, cart) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, orderObj);
    }
  });
}

module.exports.update = (qObj, updateObj, cb) => {
  Order.findOneAndUpdate(qObj, updateObj, function (err, suc) {
    if(err) {
      cb(err, null);
    } else {
      cb(null, 'SUCCESS');
    }
  })
}