import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  companyName: { type: String, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  businessType: { type: String, trim: true },
  bottleSize: { type: String, trim: true },
  quantity: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
