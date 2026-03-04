const express = require('express');
const router = express.Router();
const CarBooking = require('../models/CarBooking');
const verifyToken = require('../middleware/auth');

// Get all bookings (admin only ideally, but for now verifyToken)
router.get('/', verifyToken, async (req, res) => {
    try {
        const bookings = await CarBooking.find().populate('user').populate('vehicle');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user bookings
router.get('/user', verifyToken, async (req, res) => {
    try {
        const bookings = await CarBooking.find({ user: req.user.id }).populate('vehicle');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a booking
router.post('/', verifyToken, async (req, res) => {
    try {
        const { vehicle, startDate, endDate, totalPrice, currency, pickupLocation, dropoffLocation } = req.body;
        const newBooking = new CarBooking({
            user: req.user.id,
            vehicle,
            startDate,
            endDate,
            totalPrice,
            currency,
            pickupLocation,
            dropoffLocation
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update booking status (admin)
router.patch('/:id/status', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedBooking = await CarBooking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await CarBooking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
