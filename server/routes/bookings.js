const express = require('express');
const { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  getBookedSeats, 
  getTripByInvite, 
  getBookingById
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.get('/all', auth, getAllBookings); // Admin only in real app
router.get('/:id', auth, getBookingById);
router.get('/booked-seats/:tourId/:date', getBookedSeats);
router.get('/invite/:code', getTripByInvite);

module.exports = router;
