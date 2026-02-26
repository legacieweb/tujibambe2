const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Land Cruiser", "Van", "Bus"
    capacity: { type: Number, required: true },
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    features: [String]
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
