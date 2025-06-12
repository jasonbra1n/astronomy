# Astronomy Information Web Page

This GitHub Pages site displays astronomical information based on the current date and time (in UTC) and optionally the device's location. It uses the Astronomy Engine library (`astronomy.browser.js`) for calculations and is hosted at `https://jasonbra1n.github.io/astronomy/`.

## Features
- **Current Moon Phase**: Displays the moon's phase (e.g., "Waxing Crescent") and angle in degrees.
- **Next Full Moon**: Date and time of the next full moon.
- **Next New Moon**: Date and time of the next new moon.
- **Next Eclipse**: Type (lunar or solar) and date of the next eclipse.
- **Manual Input**: Allows changing the date/time and location (latitude/longitude).
- **Geolocation**: Optionally uses the browser's Geolocation API to set the current location.

## Usage
1. Visit `https://jasonbra1n.github.io/astronomy/`.
2. The page defaults to the current UTC date and time.
3. Enter a new date and time in the format `YYYY-MM-DD HH:MM:SS` (UTC) and click "Update" to recalculate.
4. Click "Get Current Location" to use your device's location (if supported and permitted).
5. Manually enter latitude and longitude, then click "Set Location" to update the location display.

## Files
- `index.html`: The main HTML file for the web page.
- `styles.css`: CSS for styling the page.
- `script.js`: JavaScript for astronomical calculations and interactivity.
- `astronomy.browser.js`: The Astronomy Engine library (downloaded from [cosinekitty/astronomy](https://github.com/cosinekitty/astronomy)).
- `README.md`: This file.

## Setup
- The repository is configured to use GitHub Pages from the `main` branch.
- Ensure all files are uploaded to `https://github.com/jasonbra1n/astronomy`.

## Notes
- Location is optional and not required for the core astronomical calculations (moon phases and eclipses are geocentric).
- Times are displayed in UTC for consistency.
- The moon phase demo is integrated into the main display.