const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    duration: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Hiking, Safari, Beach
    maxGroupSize: { type: Number, required: true },
    type: { type: String, enum: ['group', 'timed'], default: 'group' },
    eventDate: { type: Date }, // Only for timed events
    bookingDeadline: { type: Date }, // Only for timed events
    gallery: [String],
    isAllInclusive: { type: Boolean, default: false },
    carDetails: {
        name: { type: String, default: "Safari Land Cruiser" },
        image: { type: String, default: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        totalSeats: { type: Number, default: 8 }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', tourSchema);
