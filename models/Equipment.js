const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  lengthValue: { type: Number, default: null }, // Kabel Längen
  lengthUnit: { type: String, default: 'm' },
  quantity: { type: Number, required: true, default: 1 },
  priceDay: { type: Number, required: true }, // mietpreis/tag
  description: { type: String, default: '' }
}, {
  timestamps: true // erzeugt automatisch "createdAt" und "updatedAt"
});

module.exports = mongoose.model('Equipment', EquipmentSchema);