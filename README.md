# Lichttechnik-Verleih – Backend

Das Backend des Projekts **Leons-Lichttechnik-Verleih** stellt die serverseitige REST-API für die Verwaltung des Lichttechnik-Equipments bereit.

Die Anwendung basiert auf **Node.js** und **Express.js** und verwendet **MongoDB** als persistente Datenbank. Die Kommunikation mit MongoDB erfolgt über das ODM **Mongoose**.

Das Backend stellt sowohl Lese- und Verwaltungsoperationen für den Equipment-Bestand als auch eine spezielle Schnittstelle für die Verleihfunktion bereit.

## Features

* REST-API für Lichttechnik-Equipment
* vollständige CRUD-Funktionen
* Abrufen des gesamten Equipment-Bestands
* Abrufen einzelner Equipment-Einträge
* Erstellen neuer Equipment-Einträge
* Bearbeiten bestehender Einträge
* Löschen von Equipment
* Verleihfunktion mit automatischer Bestandsreduzierung
* MongoDB-Persistenz über Mongoose
* Schema-Validierung
* automatisches CSV-Seeding
* konfigurierbarer Port und Datenbank über Umgebungsvariablen
* CORS-Unterstützung für das Angular-Frontend
* systematisches API-Testing mit Postman

## Technologie-Stack

| Technologie  | Verwendung                        |
| ------------ | --------------------------------- |
| Node.js      | Laufzeitumgebung                  |
| Express.js   | Webframework                      |
| MongoDB      | Datenbank                         |
| Mongoose     | ODM für MongoDB                   |
| dotenv       | Verwaltung von Umgebungsvariablen |
| cors         | Cross-Origin Resource Sharing     |
| csv-parser   | Einlesen der Seed-Daten           |
| Postman      | API-Testing                       |
| Git / GitHub | Versionsverwaltung                |

## Architektur

Das Backend ist als REST-API aufgebaut.

Die zentrale Ressource ist:

```text
/api/equipment
```

Die Kommunikation zwischen Frontend und Backend erfolgt über HTTP.

```text
Angular Frontend
       │
       │ HTTP
       ▼
Express REST API
       │
       │ Mongoose
       ▼
    MongoDB
```

## Datenmodell

Die Equipment-Daten werden über ein Mongoose-Schema definiert.

```javascript
const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, default: '' },
  lengthValue: { type: Number },
  lengthUnit: { type: String, default: 'm' },
  quantity: { type: Number, required: true, default: 1 },
  priceDay: { type: Number, required: true },
  description: { type: String, default: '' }
}, { timestamps: true });
```

Durch `timestamps: true` werden `createdAt` und `updatedAt` automatisch verwaltet.

### Felder

| Feld          | Typ      | Beschreibung                   |
| ------------- | -------- | ------------------------------ |
| `_id`         | ObjectId | Eindeutige ID des Eintrags     |
| `name`        | String   | Bezeichnung des Equipments     |
| `category`    | String   | Hauptkategorie                 |
| `subCategory` | String   | Unterkategorie                 |
| `lengthValue` | Number   | Längenwert, sofern vorhanden   |
| `lengthUnit`  | String   | Einheit des Längenwerts        |
| `quantity`    | Number   | Verfügbare Menge               |
| `priceDay`    | Number   | Tagespreis                     |
| `description` | String   | Beschreibung                   |
| `createdAt`   | Date     | Erstellungszeitpunkt           |
| `updatedAt`   | Date     | Zeitpunkt der letzten Änderung |

## REST API

### Alle Equipment-Einträge abrufen

```http
GET /api/equipment
```

Liefert den aktuellen Equipment-Bestand.

**Antwort:**

```text
200 OK
500 Internal Server Error
```

### Einzelnes Equipment abrufen

```http
GET /api/equipment/:id
```

Liefert einen einzelnen Equipment-Eintrag anhand seiner ID.

**Antwort:**

```text
200 OK
404 Not Found
500 Internal Server Error
```

### Equipment erstellen

```http
POST /api/equipment
```

Erstellt einen neuen Equipment-Eintrag.

**Antwort:**

```text
201 Created
400 Bad Request
```

### Equipment bearbeiten

```http
PUT /api/equipment/:id
```

Aktualisiert einen bestehenden Equipment-Eintrag.

Für Updates wird die Mongoose-Validierung explizit aktiviert:

```javascript
{
  new: true,
  runValidators: true
}
```

**Antwort:**

```text
200 OK
400 Bad Request
404 Not Found
```

### Equipment verleihen

```http
PATCH /api/equipment/:id/rent
```

Reduziert die verfügbare Bestandsmenge eines Equipment-Eintrags um `1`.

Die Operation wird nur ausgeführt, wenn eine verfügbare Menge größer als `0` vorhanden ist.

**Antwort:**

```text
200 OK
400 Bad Request
404 Not Found
```

### Equipment löschen

```http
DELETE /api/equipment/:id
```

Löscht einen bestehenden Equipment-Eintrag.

**Antwort:**

```text
200 OK
404 Not Found
500 Internal Server Error
```

## CSV-Seeding

Das Projekt enthält ein Seed-Skript zum automatischen Befüllen der MongoDB mit Ausgangsdaten.

Die Daten werden aus folgender Datei eingelesen:

```text
data/techniklisteMitBeschreibung.csv
```

Das Seed-Skript verwendet `csv-parser` und übernimmt unter anderem die Zuordnung der CSV-Felder zum Mongoose-Datenmodell.

Zum Ausführen des Seedings:

```bash
npm run seed
```

Vorhandene Equipment-Daten werden dabei zunächst entfernt und anschließend aus der CSV-Datei neu angelegt.

## Voraussetzungen

Für die lokale Entwicklung werden benötigt:

* Node.js 18 oder höher
* npm
* MongoDB
* Git

MongoDB wird standardmäßig auf Port `27017` erwartet.

## Installation

Repository klonen:

```bash
git clone https://github.com/s0564632/lichttechnik-verleih-backend.git
cd lichttechnik-verleih-backend
```

Abhängigkeiten installieren:

```bash
npm install
```

## MongoDB starten

Unter Linux kann MongoDB beispielsweise über den Systemdienst gestartet werden:

```bash
sudo systemctl start mongod
```

Anschließend sollte eine laufende MongoDB-Instanz auf Port `27017` vorhanden sein.

## Umgebungsvariablen

Optional kann im Projektverzeichnis eine `.env`-Datei angelegt werden.

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/lichttechnik
```

Damit können Port und MongoDB-Verbindung unabhängig vom Quellcode konfiguriert werden.

## Datenbank initialisieren

Nach dem Start von MongoDB können die Ausgangsdaten importiert werden:

```bash
npm run seed
```

## Server starten

Das Backend wird mit folgendem Befehl gestartet:

```bash
npm start
```

Anschließend ist die API standardmäßig erreichbar unter:

```text
http://localhost:3000
```

Der zentrale API-Endpunkt lautet:

```text
http://localhost:3000/api/equipment
```

## Verwendung mit dem Frontend

Das Angular-Frontend kommuniziert über HTTP mit dieser REST-API.

Im Entwicklungsbetrieb werden die relativen Frontend-Anfragen

```text
/api/equipment
```

über den Angular Dev-Proxy an

```text
http://localhost:3000
```

weitergeleitet.

Damit müssen im Frontend keine vollständigen Backend-URLs verwendet werden.

## API-Testing

Die REST-Endpunkte wurden während der Entwicklung mit **Postman** getestet.

Dabei wurden insbesondere folgende Bereiche überprüft:
![get-post.png](../../../../../Pictures/webTexh-Screen/800/get-post.png)
* Abrufen des Equipment-Bestands![apiRequestjk.png](../../../../../Pictures/webTexh-Screen/800/apiRequestjk.png)
* Abrufen einzelner Einträge![apiRequestkl.png](../../../../../Pictures/webTexh-Screen/800/apiRequestkl.png)
* Erstellen![postman testscheinwerfer.png](../../../../../Pictures/webTexh-Screen/800/postman%20testscheinwerfer.png)
* Bearbeiten
* Löschen
* Verleihen
* Fehlerfälle und HTTP-Statuscodes![get.tiff](../../../../../Pictures/webTexh-Screen/800/get.tiff)
* Validierung von Daten

## Technische Herausforderungen
![tsconfig-spec-json-jasmin-hinzugefuegt.png](../../../../../Pictures/webTexh-Screen/800/tsconfig-spec-json-jasmin-hinzugefuegt.png)
### 1. MongoDB unter Debian Trixie

Bei der Einrichtung des MongoDB Community Servers unter **Debian Trixie** kam es zu Problemen beim Aktualisieren der Paketquellen. Das MongoDB-Repository wurde aufgrund der restriktiveren Sicherheitsrichtlinien für SHA-1-Signaturen nicht akzeptiert.

Die Fehlermeldung bezog sich auf eine vom Paketmanager abgelehnte Signatur:
![tsconfig-spec-json-jasmin.png](../../../../../Pictures/webTexh-Screen/800/tsconfig-spec-json-jasmin.png)
```text
Policy rejected non-revocation signature

Für die lokale Entwicklungsumgebung wurde das MongoDB-Repository deshalb mit der Option

[ trusted=yes ]

in der entsprechenden Repository-Konfiguration eingebunden.
### Mongoose-Validierung

Bei `PUT`-Operationen werden die Schema-Validierungen explizit aktiviert.

Dies ist notwendig, da Mongoose bei `findByIdAndUpdate()` standardmäßig nicht alle Schema-Validierungen auf die gleiche Weise wie bei der Erstellung eines Dokuments ausführt.

### Bestandsverwaltung beim Verleih

Der Verleih-Endpunkt reduziert die verfügbare Menge eines Equipment-Eintrags um `1`.

Ein Verleih wird abgelehnt, wenn keine verfügbare Menge mehr vorhanden ist.

### CSV-Mapping

Beim Import der Ausgangsdaten wird die Schreibweise der CSV-Felder an das Mongoose-Schema angepasst.

Insbesondere wird das CSV-Feld

```text
subcategory
```

auf das Schema-Feld

```text
subCategory
```

abgebildet.

## Bekannte technische Herausforderungen

Während der Entwicklung wurden unter anderem folgende Probleme gelöst:

* Einrichtung von Mon![tsconfig-spec-json-jasmin-hinzugefuegt.png](../../../../../Pictures/webTexh-Screen/800/tsconfig-spec-json-jasmin-hinzugefuegt.png)goDB unter Debian mit restriktiven Repository-Signaturrichtlinien
* unterschiedliche Schreibweisen von `subCategory` zwischen CSV-Datei und Datenmodell
* fehlende Schema-Validierung bei `findByIdAndUpdate()`
* Konfiguration von CORS für die Kommunikation mit dem Angular-Frontend
* Fehlerbehandlung und konsistente HTTP-Statuscodes

## Roadmap

Mögliche zukünftige Erweiterungen:

1. Benutzerverwaltung
2. Registrierung und Login
3. Passwort-Hashing mit `bcryptjs`
4. JWT-basierte Authentifizierung
5. Absicherung administrativer Endpunkte
6. zusätzliche Request-Validierung mit `express-validator`
7. Deployment der REST-API und MongoDB auf einer Cloud-Plattform

## KI-Transparenz

## Problembehebung und Entwicklungs-Notizen (Backend)

**Verwendete KI-Modelle / Systeme:**
* ChatGPT 
* Gemini 

| Problem | Analyse-Ansatz / Kernfrage | Technische Lösung |
| :--- | :--- | :--- |
| **CORS-Fehler**<br>Frontend ruft Backend auf | „Was ist die Same-Origin-Policy und warum blockiert der Browser Anfragen an einen anderen Port?" | • `cors()`-Middleware in Express einbinden. |
| **`req.body` ist undefined** | „Wozu dient express.json() und in welcher Reihenfolge werden app.use()-Middlewares abgearbeitet?" | • `express.json()` vor den Routen registrieren.<br>• Reihenfolge einhalten: `cors` → `json` → Routen. |
| **Falscher Statuscode** | „Wann nutzt man 200, 201, 400, 404 und 409 in einer REST-API?" | • `POST` → `201`<br>• ID nicht gefunden → `404`<br>• Ungültige Eingabe → `400`<br>• Konflikt (z. B. Bestand 0) → `409` |
| **Fehler beim Seeding**<br>`Cannot read properties of undefined (reading 'trim')` | „Was bedeutet dieser TypeError in JavaScript und wie finde ich heraus, welche Variable undefined ist?" | • Feldnamen der CSV-Kopfzeile mit dem Code vergleichen.<br>• Groß-/Kleinschreibung beachten (`subcategory` ≠ `subCategory`).<br>• Vorher `console.log(data)` ausgeben. |
| **README unstrukturiert** | „Welche Abschnitte gehören typischerweise in die README eines Node/Express-Projekts mit MongoDB?" | • Dokumentation aufteilen in: Überblick, Stack, Installation, `.env`-Beispiel, Start, Seed, API-Übersicht und KI-Transparenz am Ende. |

<br>

| Einsatzbereich / Zweck | Beispiel-Prompts (Recherche & Debugging) |
| :--- | :--- |
| **Express-Middleware & Middleware-Sequenzierung** | • *„Wie funktioniert die `cors`-Middleware in Express.js technisch und wie muss sie konfiguriert werden, um Anfragen vom Angular-Dev-Server (`localhost:4200`) an die REST-API (`localhost:3000`) für alle HTTP-Methoden zu erlauben?“*<br>• *„Warum ist `req.body` in meinem Express-Route-Handler undefined, obwohl das Frontend korrekte JSON-Daten sendet, und welche Rolle spielt die Reihenfolge von `app.use()`-Middlewares?“* |
| **HTTP-Statuscodes & REST-Standards** | • *„Welcher HTTP-Statuscode ist im REST-Standard am besten geeignet, wenn bei einem `PATCH`-Aufruf an `/api/equipment/:id/rent` die Bestandsmenge `quantity` bereits `0` ist?“*<br>• *„Was ist der semantische Unterschied zwischen HTTP `200 OK` und HTTP `201 Created` bei erfolgreichen Schreibzugriffen?“* |
| **JavaScript & Data Parsing** | • *„Was ist die Ursache für den Fehler `TypeError: Cannot read properties of undefined (reading 'trim')` beim Verarbeiten von CSV-Daten mit dem `csv-parser` in Node.js und wie validiert man Datensätze gegen Groß-/Kleinschreibung im Header?“* |
| **Systemanalyse & Dokumentation** | • *„Ich erhalte beim `apt update` unter Debian Trixie die Fehlermeldung: `Policy rejected non-revocation signature` für das MongoDB-Repository. Was ist die technische Ursache dieser Meldung und welche Handlungsoptionen gibt es?“*<br>• *„Welche Abschnitte und Reihenfolge empfehlen sich für die `README.md` eines Hochschulprojekts (MEAN-Stack), um Entwicklungsverlauf, Systemarchitektur und Herausforderungen darzustellen?“* |