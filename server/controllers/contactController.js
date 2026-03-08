const Inquiry = require('../models/Inquiry');
const Subscriber = require('../models/Subscriber');

// Submit an inquiry
exports.submitInquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const inquiry = new Inquiry({ name, email, subject, message });
        await inquiry.save();
        res.status(201).json({ success: true, message: 'Inquiry submitted successfully!' });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if subscriber already exists
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            if (subscriber.isActive) {
                return res.status(400).json({ success: false, message: 'Already subscribed!' });
            } else {
                subscriber.isActive = true;
                await subscriber.save();
                return res.status(200).json({ success: true, message: 'Subscription reactivated!' });
            }
        }
        
        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Get all inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Get all subscribers
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Mark inquiry as read/responded
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
        if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
        res.status(200).json(inquiry);
    } catch (error) {
        console.error('Error updating inquiry status:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Delete inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await Inquiry.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Delete subscriber
exports.deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        await Subscriber.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Subscriber deleted' });
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Admin: Bulk delete subscribers
exports.bulkDeleteSubscribers = async (req, res) => {
    try {
        const { ids } = req.body;
        await Subscriber.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true, message: 'Subscribers deleted' });
    } catch (error) {
        console.error('Error bulk deleting subscribers:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
