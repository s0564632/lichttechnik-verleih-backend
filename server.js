const express = require('express');
const app = express();
const PORT = 3000;

// Test-Route für den Browser
app.get('/', (req, res) => {
    res.send('Der Lichttechnik-Server läuft!');
});

// Server starten
app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(` \O/ Server läuft auf http://localhost:${PORT}`);
    console.log(`=============================================`);
});