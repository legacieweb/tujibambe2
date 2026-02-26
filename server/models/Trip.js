const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    date: { type: Date, required: true },
    inviteCode: { type: String, unique: true, required: true },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
