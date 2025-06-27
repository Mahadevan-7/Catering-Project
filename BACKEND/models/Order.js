const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  email: String,
  items: [{ title: String, qty: Number, price: Number }],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
