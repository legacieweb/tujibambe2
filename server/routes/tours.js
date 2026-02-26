const express = require('express');
const { createTour, getAllTours, getTourById } = require('../controllers/tourController');
const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', createTour); // Admin only in real app

module.exports = router;
