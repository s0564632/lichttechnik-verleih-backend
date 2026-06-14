# Lichttechnik-Verleih Backend

Dieses Repository enthält den serverseitigen Kern (Backend) der Lichttechnik-Verleihplattform. Die Anwendung stellt eine REST-API zur Verwaltung des Lichttechnik-Bestands bereit und kommuniziert mit einer persistenten NoSQL-Datenbank.

## Technologie-Stack

- **Laufzeitumgebung:** Node.js
- **Framework:** Express.js
- **Datenbank:** MongoDB
- **ODM (Object Document Mapping):** Mongoose

## Aktueller Entwicklungsstand

Der aktuelle Meilenstein (Infrastruktur und Datenmodellierung) ist erfolgreich abgeschlossen:
- **Server-Setup:** Ein Express-Server wurde aufgesetzt und auf Port 3000 konfiguriert.
- **Datenbank-Anbindung:** Die Integration von Mongoose zur Kommunikation mit der lokalen MongoDB-Instanz wurde implementiert.
- **Datenmodellierung:** Ein Mongoose-Schema (`Equipment`) wurde definiert. Es bildet die Struktur der physischen Bestandsliste (basierend auf CSV-Vorgaben) im System ab (Felder: `name`, `category`, `lengthValue`, `lengthUnit`, `quantity`, `priceDay`, `description`).

## Dokumentation technischer Herausforderungen

### 1. Repository-Initialisierung und GPG-Schlüsselkonflikte unter Debian Trixie
**Problem:** Während der Installation des MongoDB Community Servers auf dem Entwicklungssystem (Debian Trixie/Testing) verweigerte der Paketmanager `apt` die Aktualisierung der Repositories. Grund war eine restriktive Sicherheitsrichtlinie des Betriebssystems bezüglich veralteter SHA1-Signaturen im offiziellen MongoDB-Bookworm-Repository (`Policy rejected non-revocation signature`).
**Lösung:** Für die lokale Entwicklungsumgebung wurde die Signaturprüfung für dieses spezifische Repository temporär durch das Hinzufügen der Option `[ trusted=yes ]` in der Datei `/etc/apt/sources.list.d/mongodb-org-7.0.list` umgangen. Die Installation konnte daraufhin erfolgreich abgeschlossen werden.

## Zukünftige Erweiterungen / Roadmap

Die folgenden Implementierungsschritte sind für die kommenden Entwicklungszyklen geplant:
1. **Daten-Seeding (Ticket #4):** Entwicklung eines automatisierten Import-Skripts, um den bestehenden Excel/CSV-Datenbestand beim Systemstart validiert in die MongoDB-Datenbank zu migrieren.
2. **REST-API Endpunkte (Ticket #5):** Bereitstellung standardisierter HTTP-Routen (`GET`, `POST`, `PUT`, `DELETE`) unter `/api/equipment`, um dem Frontend den Lese- und Schreibzugriff auf den Datenbestand zu ermöglichen.
3. **Validierung und Error-Handling:** Implementierung von Middleware zur Absicherung von API-Anfragen und zur strukturierten Ausgabe von Fehlermeldungen.