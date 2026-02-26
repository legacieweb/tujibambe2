const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
