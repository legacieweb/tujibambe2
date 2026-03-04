const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Land Cruiser", "Van", "Bus"
    capacity: { type: Number, required: true },
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    features: [String],
    description: { type: String },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Manual' },
    fuel: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], default: 'Diesel' },
    year: { type: Number },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
