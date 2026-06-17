# Lichttechnik-Verleih Backend

Dieses Repository enthält den serverseitigen Kern (Backend) der Lichttechnik-Verleihplattform. Die Anwendung stellt eine REST-API zur Verwaltung des Lichttechnik-Bestands bereit und kommuniziert mit einer persistenten NoSQL-Datenbank.

## Technologie-Stack

- **Laufzeitumgebung:** Node.js
- **Framework:** Express.js
- **Datenbank:** MongoDB
- **ODM (Object Document Mapping):** Mongoose

## Aktueller Entwicklungsstand

Das Teilziel zur Bereitstellung der Dateninfrastruktur und der Schnittstellen ist erfolgreich abgeschlossen:
- **Server-Setup:** Ein Express-Server wurde aufgesetzt und auf Port 3000 konfiguriert.
- **Datenbank-Anbindung:** Die Integration von Mongoose zur Kommunikation mit der lokalen MongoDB-Instanz wurde implementiert.
- **Datenmodellierung:** Ein Mongoose-Schema (`Equipment`) wurde definiert, welches die physische Bestandsliste (basierend auf CSV-Vorgaben) abbildet.
- **Daten-Seeding (Ticket #5):** Ein automatisiertes Import-Skript (`npm run seed`) wurde integriert, um den CSV-Datenbestand bereinigt und typisiert in die MongoDB zu migrieren.
- **REST-API Endpunkte (Ticket #6):** Es wurden performante GET-Routen zur Datenabfrage implementiert:
  - `GET /api/equipment` – Gibt den gesamten Datenbestand als JSON-Array zurück.
  - `GET /api/equipment/:id` – Gibt die Details eines spezifischen Geräts anhand seiner MongoDB-ID zurück.
- **CORS-Sicherheitskonfiguration:** Die Middleware `cors` wurde integriert, um asynchrone Cross-Origin-Anfragen aus dem Angular-Frontend (Port 4200) zu erlauben.

## Docu tech challange

### 1. Repository-Initialisierung und GPG-Schlüsselkonflikte unter Debian Trixie
**Problem:** Während der Installation des MongoDB Community Servers auf dem Entwicklungssystem (Debian Trixie/Testing) verweigerte der Paketmanager `apt` die Aktualisierung der Repositories. Grund war eine restriktive Sicherheitsrichtlinie des Betriebssystems bezüglich veralteter SHA1-Signaturen im offiziellen MongoDB-Bookworm-Repository (`Policy rejected non-revocation signature`).

**Lösung:** Für die lokale Entwicklungsumgebung wurde die Signaturprüfung für dieses spezifische Repository temporär durch das Hinzufügen der Option `[ trusted=yes ]` in der Datei `/etc/apt/sources.list.d/mongodb-org-7.0.list` umgangen. Die Installation wurde erfolgreich abgeschlossen.

## Zukünftige Erweiterungen / Roadmap

Die folgenden Implementierungsschritte ist für die kommenden Entwicklungszyklen im Backend geplant:
1. **Schreibende REST-API Endpunkte:** Erweiterung der API um `POST`-, `PUT`- und `DELETE`-Routen, um administrative Eingriffe in den Bestand zu ermöglichen (CRUD-Vollständigkeit).
2. **Validierung und Error-Handling:** Implementierung von Middleware zur Absicherung von API-Anfragen und zur strukturierten Ausgabe von Fehlermeldungen bei fehlerhaften IDs oder ungültigen Payloads.
