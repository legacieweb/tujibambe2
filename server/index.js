const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tujibambe')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Models
require('./models/User');
require('./models/Tour');
require('./models/Vehicle');
require('./models/Trip');
require('./models/Booking');
require('./models/CarBooking');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/car-bookings', require('./routes/carBookings'));

// Redirect local IyonicPay requests directly to the production service
app.get('/request', (req, res) => {
    const queryString = new URLSearchParams(req.query).toString();
    res.redirect(`https://pay.iyonicorp.com/request?${queryString}`);
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Tujibambe API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
