const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// GET /api/equipment - Alle Ausrüstungsgegenstände abrufen
router.get('/', async (req, res) => {
    try {
        const tools = await Equipment.find();
        res.json(tools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const item = await Equipment.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Ausrüstungsgegenstand nicht gefunden' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;