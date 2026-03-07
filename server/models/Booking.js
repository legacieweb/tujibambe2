const mongoose = require('mongoose');

// Ensure models are registered for population
require('./Tour');
require('./User');
require('./Vehicle');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }, // Null if ticket only event
    eventTitle: { type: String }, // For ticket-only events
    eventType: { type: String, enum: ['Adventure', 'EpicFunTime', 'EventPlanning', 'Tour'], default: 'Tour' },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }, // Link to a coordinator trip if any
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    bookingDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    selectedSeats: [{ type: Number }],
    totalPrice: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    isCoordinator: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentReference: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
