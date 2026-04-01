# FritzPass (fritz.box only)

Lokaler Passwort-Manager als Overlay für **fritz.box**.

## Vorgaben umgesetzt
- Funktioniert nur auf der Domain `fritz.box`
- GUI wird per **F9** geöffnet und geschlossen
- Speichert Benutzername/Passwort/Notiz lokal im Browser (`localStorage`)

## Nutzung
1. Dateien per kleinem Webserver ausliefern (oder in deine fritz.box-Seite integrieren):

```bash
python3 -m http.server 8000
```

2. Seite aufrufen und mit **F9** das Panel öffnen.

## Sicherheit
Die Daten sind lokal und unverschlüsselt gespeichert. Das ist bewusst so, weil keine Abfrage gewünscht war.
