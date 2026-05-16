const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('./lib/prisma');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_here';

// Middleware
app.use(cors());
app.use(express.json());

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    console.log('Authentication failed: No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Authentication failed: Token verification error', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Tujibambe API is running');
});

// Auth Routes
app.post('/api/users/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user'
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for hardcoded admin from .env
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ id: 'admin-id', role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ 
        user: { 
          id: 'admin-id', 
          name: 'Administrator', 
          email: process.env.ADMIN_EMAIL, 
          role: 'admin' 
        }, 
        token 
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Tours Routes
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(tours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tours' });
  }
});

app.get('/api/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await prisma.tour.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });
    
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tour' });
  }
});

// Vehicles Routes
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// Example route to check DB connection
app.get('/db-test', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Bookings Routes
app.post('/api/bookings', authenticate, async (req, res) => {
  try {
    const { 
      tour: tourId, 
      bookingDate, 
      numberOfPeople, 
      totalPrice, 
      currency, 
      selectedSeats, 
      isCoordinator, 
      vehicleId, 
      tripId, 
      paymentReference,
      amountPaid // Amount being paid now
    } = req.body;

    const userId = req.user.id;
    const depositAmount = amountPaid || totalPrice; // Default to full price if not specified

    // Resolve tourId (it might be a slug or a CUID)
    let actualTourId = tourId;
    if (tourId) {
      const tour = await prisma.tour.findFirst({
        where: {
          OR: [
            { id: tourId },
            { slug: tourId }
          ]
        }
      });
      if (tour) {
        actualTourId = tour.id;
      }
    }

    // Check for 10% threshold
    if (depositAmount < totalPrice * 0.1) {
      return res.status(400).json({ message: 'Minimum deposit of 10% is required.' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        tourId: actualTourId,
        bookingDate: new Date(bookingDate),
        numberOfPeople: parseInt(numberOfPeople),
        totalPrice: parseFloat(totalPrice),
        amountPaid: parseFloat(depositAmount),
        currency,
        selectedSeats,
        isCoordinator,
        vehicleId,
        tripId,
        paymentReference,
        paymentStatus: depositAmount >= totalPrice ? 'completed' : 'pending',
        status: 'confirmed',
        payments: {
          create: {
            amount: parseFloat(depositAmount),
            currency,
            paymentReference,
            paymentStatus: 'completed'
          }
        }
      }
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

app.get('/api/bookings/my-bookings', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        tour: true,
        vehicle: true,
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/all', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        tour: true,
        vehicle: true,
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch all bookings' });
  }
});

app.post('/api/bookings/:id/pay', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentReference, currency } = req.body;
    const userId = req.user.id;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking || booking.userId !== userId) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const newAmountPaid = booking.amountPaid + parseFloat(amount);
    
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        amountPaid: newAmountPaid,
        paymentStatus: newAmountPaid >= booking.totalPrice ? 'completed' : 'pending',
        payments: {
          create: {
            amount: parseFloat(amount),
            currency: currency || booking.currency,
            paymentReference,
            paymentStatus: 'completed'
          }
        }
      }
    });

    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to process payment' });
  }
});

// IyonicPay Verification Route
app.get('/api/payments/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    // IyonicPay verification logic
    // For now we assume the reference is valid if it exists, 
    // in production you would call IyonicPay API to verify the transaction
    if (reference) {
      res.json({ success: true, data: { reference, status: 'success' } });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('IyonicPay verification error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error during verification' });
  }
});

// Inquiries Routes
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const inquiry = await prisma.inquiry.create({
      data: { name, email, subject, message }
    });
    res.status(201).json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send inquiry' });
  }
});

app.get('/api/inquiries', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch inquiries' });
  }
});

app.patch('/api/inquiries/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update inquiry' });
  }
});

app.delete('/api/inquiries/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { id } = req.params;
    await prisma.inquiry.delete({ where: { id } });
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete inquiry' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
