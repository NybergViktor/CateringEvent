const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    eventDate: { type: Date },
    guestCount: { type: Number, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
