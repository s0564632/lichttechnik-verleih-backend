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

// POST /api/equipment - Neuen Equipment-Gegenstand erstellen
router.post('/', async (req, res) => {
    try {
        const equipment = new Equipment(req.body);
        const savedEquipment = await equipment.save();
        res.status(201).json(savedEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/equipment/:id - Vorhandenen Equipment-Gegenstand aktualisieren
router.put('/:id', async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEquipment) {
            return res.status(404).json({ message: 'Ausrüstungsgegenstand nicht gefunden' });
        }
        res.json(updatedEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}); 

// PATCH /api/equipment/:id - Equiptment ausleihen
router.patch('/:id/rent', async (req, res) => {
    console.log('PATCH /:id/rent wurde aufgerufen');
    try {
const item = await Equipment.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Ausrüstungsgegenstand nicht gefunden' });
        }

        if(item.quantity <= 0) {
            return res.status(400).json({ message: 'Die Menge des Ausrüstungsgegenstands ist bereits 0 oder kleiner' 
            });

    }

    item.quantity -= 1;
    
    const updatedItem = await item.save();
    
    res.json(updatedItem);

} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// DELETE /api/equipment/:id - Vorhandenen Equipment-Gegenstand löschen
router.delete('/:id', async (req, res) => {
    try {
        const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!deletedEquipment) {
            return res.status(404).json({ message: 'Ausrüstungsgegenstand nicht gefunden' });
        }
        res.json({ message: 'Ausrüstungsgegenstand erfolgreich gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

