import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ['purchase', 'sale', 'adjustment'],
    required: true
  },
  referenceNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed'],
    default: 'pending'
  },
  notes: String,
}, {
  timestamps: true,
});