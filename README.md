# Lichttechnik-Verleih Backend

Dieses Repository enthält den serverseitigen Kern (Backend) der Lichttechnik-Verleihplattform. Die Anwendung stellt eine REST-API zur Verwaltung des Lichttechnik-Bestands bereit und kommuniziert mit einer persistenten NoSQL-Datenbank.

## Technologie-Stack

- **Laufzeitumgebung:** Node.js
- **Framework:** Express.js
- **Datenbank:** MongoDB
- **ODM (Object Document Mapping):** Mongoose

## Aktueller Entwicklungsstand

Der Meilenstein zur Bereitstellung der reibungslosen Dateninfrastruktur und der Schnittstellen ist erfolgreich abgeschlossen:
- **Server-Setup:** Ein Express-Server wurde aufgesetzt und auf Port 3000 konfiguriert.
- **Datenbank-Anbindung:** Die Integration von Mongoose zur Kommunikation mit der lokalen MongoDB-Instanz wurde implementiert.
- **Datenmodellierung:** Ein Mongoose-Schema (`Equipment`) wurde definiert, welches die physische Bestandsliste (basierend auf CSV-Vorgaben) abbildet.
- **Daten-Seeding (Ticket #5):** Ein automatisiertes Import-Skript (`npm run seed`) wurde integriert, um den CSV-Datenbestand bereinigt und typisiert in die MongoDB zu migrieren.
- **REST-API Endpunkte (Ticket #6):** Es wurden performante GET-Routen zur Datenabfrage implementiert:
  - `GET /api/equipment` – Gibt den gesamten Datenbestand als JSON-Array zurück.
  - `GET /api/equipment/:id` – Gibt die Details eines spezifischen Geräts anhand seiner MongoDB-ID zurück.
- **Cross-Origin-Sicherheitsarchitektur:** Integration und Konfiguration der `cors`-Middleware zur Autorisierung asynchroner Ressourcen-Anfragen aus dem Angular-Frontend (Port 4200).

## Dokumentation technischer Herausforderungen

### 1. Repository-Initialisierung und GPG-Schlüsselkonflikte unter Debian Trixie
**Problem:** Während der Installation des MongoDB Community Servers auf dem Entwicklungssystem (Debian Trixie/Testing) verweigerte der Paketmanager `apt` die Aktualisierung der Repositories aufgrund restriktiver Sicherheitsrichtlinien des Betriebssystems bezüglich veralteter SHA1-Signaturen (`Policy rejected non-revocation signature`).
**Lösung:** Für die lokale Entwicklungsumgebung wurde die Signaturprüfung für dieses spezifische Repository temporär durch das Hinzufügen der Option `[ trusted=yes ]` in der Datei `/etc/apt/sources.list.d/mongodb-org-7.0.list` umgangen.

### 2. IPv6-Auflösungskonflikte bei der Datenbankverbindung (Timeout-Gefahr)
**Problem:** Bei der Verwendung des Standard-Hosts `localhost` in der Mongoose-Verbindungszeichenfolge kam es zu sporadischen Verbindungsabbrüchen oder extrem langen Latenzen beim Serverstart. Ursache ist das rezipeptive Verhalten moderner Node.js-Laufzeitumgebungen, die `localhost` primär zu der IPv6-Loopback-Adresse (`::1`) auflösen, während der MongoDB-Dienst nativ auf IPv4 gebunden war.
**Lösung:** Die Verbindungs-URL wurde hart auf die IPv4-Schnittstelle `mongodb://127.0.0.1:27017/lichttechnik` umgestellt. Dies erzwingt die direkte Routenführung und stabilisiert den Handshake.

### 3. Cross-Origin Resource Sharing (CORS) Blockade im Browser
**Problem:** Beim ersten Integrationstest verweigerte das Angular-Frontend den Zugriff auf die REST-API. Der Browser blockierte die HTTP-Anfragen aufgrund der *Same-Origin-Policy*, da Frontend (Port 4200) und API-Server (Port 3000) auf unterschiedlichen logischen Ports operieren.
**Lösung:** Das Backend wurde um das npm-Paket `cors` erweitert. Durch die globale Einbindung als Middleware (`app.use(cors())`) sendet der Express-Server nun die erforderlichen `Access-Control-Allow-Origin`-Header mit, wodurch der Datenaustausch legitimiert wird.

## Zukünftige Erweiterungen / Roadmap

Die folgenden Implementierungsschritte sind für die kommenden Entwicklungszyklen im Backend geplant:
1. **Schreibende REST-API Endpunkte (CRUD):** Erweiterung der API um `POST`-, `PUT`- und `DELETE`-Routen, um administrative Eingriffe (Hinzufügen, Editieren, Löschen) in den Bestand zu ermöglichen.
2. **Validierung und Error-Handling:** Implementierung von dedizierter Express-Middleware zur Absicherung von API-Payloads (Sicherstellung korrekter Datentypen bei Neuanlagen) und zur strukturierten JSON-Ausgabe im Fehlerfall.