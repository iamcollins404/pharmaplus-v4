import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  contactPerson: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  paymentTerms: String,
  rating: { type: Number, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});