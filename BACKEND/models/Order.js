const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  customerName: { type: String, required: true, default: 'Anonymous Customer' },
  phone: { type: Number },
  address: { type: String },
  items: [{ 
    title: { type: String, required: true }, 
    qty: { type: Number, required: true, min: 1 }, 
    price: { type: Number, required: true, min: 0 } 
  }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] },
  eventType: { type: String, default: 'General', enum: ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'General'] },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
