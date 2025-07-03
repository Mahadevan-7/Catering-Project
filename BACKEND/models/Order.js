const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  email: String,
  customerName: { type: String, default: 'Anonymous Customer' },
  phone: String,
  address: String,
  items: [{ title: String, qty: Number, price: Number }],
  total: Number,
  status: { type: String, default: 'Pending' },
  eventType: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
