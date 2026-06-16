const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, eventDate, guestCount } = req.body;
    const contact = new Contact({ name, email, phone, message, eventDate, guestCount });
    const saved = await contact.save();
    res.status(201).json({ message: 'Message received! We will be in touch soon.', data: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all submissions (admin use)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
