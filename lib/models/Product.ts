import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  description: String,
  category: { type: String, required: true },
  manufacturer: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  stockLevel: { type: Number, required: true, default: 0 },
  reorderPoint: { type: Number, required: true },
  expiryDate: Date,
  batchNumber: String,
  location: String,
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);