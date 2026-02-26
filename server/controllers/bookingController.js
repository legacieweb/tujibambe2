const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Tour = require('../models/Tour');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.createBooking = async (req, res) => {
    try {
        const { tour, bookingDate, numberOfPeople, totalPrice, selectedSeats, isCoordinator, vehicleId, tripId, paymentReference, currency } = req.body;
        
        // Verify payment if reference is provided
        if (paymentReference) {
            // IyonicPay verification could be added here if an API endpoint exists
            // For now, we'll proceed since Paystack is removed
        }
        
        let finalTripId = tripId;

        // If coordinator, create a Trip first
        if (isCoordinator) {
            const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();
            const newTrip = new Trip({
                tour,
                coordinator: req.user.id,
                vehicle: vehicleId,
                date: bookingDate,
                inviteCode
            });
            await newTrip.save();
            finalTripId = newTrip._id;
        }

        const booking = new Booking({
            user: req.user.id,
            tour,
            trip: finalTripId,
            bookingDate,
            numberOfPeople,
            totalPrice,
            currency: currency || 'USD',
            selectedSeats,
            isCoordinator: !!isCoordinator,
            paymentReference,
            paymentStatus: paymentReference ? 'completed' : 'pending',
            status: paymentReference ? 'confirmed' : 'pending'
        });
        await booking.save();

        // Send Email Notification (Nodemailer)
        // ... (existing email logic)
        
        res.status(201).json({ booking, inviteCode: isCoordinator ? (await Trip.findById(finalTripId)).inviteCode : null });
    } catch (err) {
        console.error('Booking creation error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getTripByInvite = async (req, res) => {
    try {
        const { code } = req.params;
        const trip = await Trip.findOne({ inviteCode: code }).populate('tour vehicle coordinator');
        if (!trip) return res.status(404).json({ message: 'Invalid invite code' });
        
        // Also find already booked seats for this trip
        const bookings = await Booking.find({ trip: trip._id, status: { $ne: 'cancelled' } });
        const bookedSeats = bookings.reduce((acc, b) => acc.concat(b.selectedSeats), []);
        
        res.json({ trip, bookedSeats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('tour')
            .populate({
                path: 'trip',
                populate: { path: 'vehicle' }
            });
        
        const bookingData = await Promise.all(bookings.map(async (b) => {
            let bObj = b.toObject();
            if (b.trip) {
                const tripBookings = await Booking.find({ trip: b.trip._id, status: { $ne: 'cancelled' } });
                bObj.trip.bookedSeats = tripBookings.reduce((acc, tb) => acc.concat(tb.selectedSeats), []).map(s => s.toString());
            }
            return bObj;
        }));

        res.json(bookingData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('tour')
            .populate({
                path: 'trip',
                populate: { path: 'vehicle' }
            });
        
        const bookingData = await Promise.all(bookings.map(async (b) => {
            let bObj = b.toObject();
            if (b.trip) {
                const tripBookings = await Booking.find({ trip: b.trip._id, status: { $ne: 'cancelled' } });
                bObj.trip.bookedSeats = tripBookings.reduce((acc, tb) => acc.concat(tb.selectedSeats), []).map(s => s.toString());
            }
            return bObj;
        }));

        res.json(bookingData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user')
            .populate('tour')
            .populate({
                path: 'trip',
                populate: { path: 'vehicle' }
            });
        
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        
        // Ensure user is authorized to view this booking
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // If it's a trip booking, also get all booked seats for that trip
        let bookingData = booking.toObject();
        if (booking.trip) {
            const tripBookings = await Booking.find({ trip: booking.trip._id, status: { $ne: 'cancelled' } });
            bookingData.trip.bookedSeats = tripBookings.reduce((acc, b) => acc.concat(b.selectedSeats), []).map(s => s.toString());
        }

        res.json(bookingData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookedSeats = async (req, res) => {
    try {
        const { tourId, date } = req.params;
        
        // Use a date range to find bookings for that day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await Booking.find({ 
            tour: tourId, 
            bookingDate: { $gte: startOfDay, $lte: endOfDay },
            status: { $ne: 'cancelled' }
        });
        
        const bookedSeats = bookings.reduce((acc, booking) => {
            return acc.concat(booking.selectedSeats);
        }, []);
        
        res.json(bookedSeats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
