const express = require('express');
const { createTour, getAllTours, getTourById, updateTour, deleteTour } = require('../controllers/tourController');
const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', createTour); 
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

module.exports = router;
