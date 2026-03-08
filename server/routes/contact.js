const express = require('express');
const { 
    submitInquiry, 
    subscribe, 
    getAllInquiries, 
    getAllSubscribers, 
    updateInquiryStatus,
    deleteInquiry,
    deleteSubscriber,
    bulkDeleteSubscribers
} = require('../controllers/contactController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Public routes
router.post('/inquiry', submitInquiry);
router.post('/subscribe', subscribe);

// Admin routes
router.get('/inquiries', auth, admin, getAllInquiries);
router.get('/subscribers', auth, admin, getAllSubscribers);
router.patch('/inquiry/:id', auth, admin, updateInquiryStatus);
router.delete('/inquiry/:id', auth, admin, deleteInquiry);
router.delete('/subscriber/:id', auth, admin, deleteSubscriber);
router.post('/subscribers/bulk-delete', auth, admin, bulkDeleteSubscribers);

module.exports = router;
