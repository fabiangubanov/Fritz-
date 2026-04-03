# Fritz Paper Plugin (1.21.x)

Ein kleines Beispiel-Plugin für **Minecraft Paper 1.21.x**.

## Features
- Begrüßungsnachricht beim Join
- `/fritz hello` sendet eine Nachricht
- `/fritz heal` heilt den Spieler vollständig

## Build
```bash
mvn clean package
```

Die fertige JAR liegt danach unter:
- `target/fritz-paper-plugin-1.0.0.jar`

## Installation
1. JAR aus `target/` in den `plugins/` Ordner deines Paper-Servers kopieren.
2. Server neu starten.

## Befehle
- `/fritz`
- `/fritz hello`
- `/fritz heal`
