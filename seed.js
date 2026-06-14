const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Equipment = require('./models/Equipment');

const DB_URI = 'mongodb://localhost:27017/lichttechnik';
const CSV_FILE_PATH = path.join(__dirname, 'data', 'techniklisteMitBeschreibung.csv');

async function seedDatabase() {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB verbunden');

    await Equipment.deleteMany({});
    console.log('Vorhandene Daten gelöscht');

    const result = [];

    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => {
        const cleanEquipment = {
            name: data.name.trim(),
            category: data.category.trim() || 'Unkategorisiert',
            lengthValue: data.lengthValue && data.lengthValue.trim() !== '' ? Number(data.lengthValue) : null,
            lengthUnit: data.lengthUnit.trim() || 'm',
            quantity: Number(data.quantity) || 0,
            priceDay: Number(data.priceDay) || 0,
            description: data.description.trim() || ''
        };
        result.push(cleanEquipment);
      })
      .on('end', async () => {
        try {
          await Equipment.insertMany(result);
          console.log('Daten erfolgreich in die Datenbank eingefügt');
        } catch (err) {
          console.error('Fehler beim Einfügen der Daten:', err);
        } finally {
          await mongoose.connection.close();
          console.log('MongoDB-Verbindung geschlossen');
        }
    });
  } catch (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    await mongoose.connection.close();
  }
}

seedDatabase(); //Skript starten