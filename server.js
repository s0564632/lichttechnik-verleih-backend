const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware zum Parsen von JSON

// MongoDB-Verbindung
mongoose.connect('mongodb://localhost:27017/lichttechnik') 
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.error('MongoDB-Verbindungsfehler:', err));


// Routen
app.get('/', (req, res) => {
    res.send('Der Lichttechnik-Server läuft und die Datenbank ist bereit!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(` \O/ Server läuft auf http://localhost:${PORT}`);
    console.log(`=============================================`);
});