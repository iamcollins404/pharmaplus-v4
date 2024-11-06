import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  notes: String,
}, {
  timestamps: true,
});