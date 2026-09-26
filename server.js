require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const equipmentRoutes = require('./routes/equipment');

app.use(cors());
app.use(express.json()); // Middleware zum Parsen von JSON

// MongoDB-Verbindung
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lichttechnik') 
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB-Verbindungsfehler:', err));


// Routen
app.use('/api/equipment', equipmentRoutes);
app.get('/', (req, res) => {
    res.send('Der Lichttechnik-Server läuft und die Datenbank ist bereit!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(` \\O/ Server läuft auf http://localhost:${PORT}`);
    console.log(`=============================================`);
});