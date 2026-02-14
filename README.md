# Generador de Invitación Web - Baby Shower

## Cómo usar (local)
1. Descomprime el ZIP.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` con Live Server (o doble click en el archivo).
4. En el generador:
   - Escribe el/los nombres (ej: "Juan Perez" o "Juan y Maria").
   - Selecciona la cantidad de personas (1, 2 o 3).
   - (Opcional) Pega el **Base URL** donde lo vas a publicar (ej: tu dominio o GitHub Pages).
   - Pulsa **Generar enlace**.
5. Copia el enlace o usa el botón de WhatsApp para enviarlo.

## Personalización rápida
Edita `assets/js/config.js`:
- `EVENT_TITLE`, `HOSTS_LINE`, `EVENT_DATETIME`, `LOCATION_TEXT`
- `MAP_EMBED_URL` (cuando confirmes el mapa real)
- Textos adicionales (sobre cerrado, etc.)

> Nota: Para que el enlace funcione desde WhatsApp en el celular, lo ideal es **publicar** la carpeta (GitHub Pages/Netlify/Vercel).
