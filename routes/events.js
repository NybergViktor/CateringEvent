const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location, capacity, price, image } = req.body;
    const event = new Event({ title, description, date, location, capacity, price, image });
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const { title, description, date, location, capacity, price, image } = req.body;
    const update = { title, description, date, location, capacity, price, image };
    // Remove undefined fields so partial updates work without clearing unset keys
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
