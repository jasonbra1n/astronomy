# Astronomy Information Web Page

This tool displays astronomical information based on the user's local date, time, and location. It uses the Astronomy Engine library (`astronomy.browser.js`) for all celestial calculations.

The page is designed to function both as a standalone tool hosted on GitHub Pages and as an embedded component within the **LAB Digital Workshop** at `https://lab.jasonbrain.com/#astronomy`.

## Features
- **Dynamic Moon & Sun Data**: Calculates and displays moon phase (for the day and exact time), moonrise/moonset times, sunrise/sunset times, and total day/moon-up length.
- **Future Event Prediction**: Shows the date and time for the next Full Moon, New Moon, and the next major solar or lunar eclipse.
- **Interactive Controls**:
    - An intuitive date/time picker with a "Reset to Now" feature.
    - A "Get Current Location" button using the browser's Geolocation API.
    - Manual input for latitude and longitude.
    - A dropdown of popular world cities for quick location setting.
- **Light & Dark Themes**: Includes a theme toggle for user preference. When embedded in the LAB Digital Workshop, the theme automatically syncs with the parent application.
- **Responsive Design**: The interface is optimized for both mobile and desktop screens.

## Usage
1. Visit `https://jasonbra1n.github.io/astronomy/`.
2. The page defaults to the current local date and time. All astronomical data is calculated automatically.
3. Use the date picker to select a different date and time. The data will refresh automatically upon selection.
4. To enable location-specific data (rise/set times), do one of the following:
   - Click **"Get Current Location"** to use your device's location.
   - Select a city from the **"Choose a popular city"** dropdown.
   - Manually enter latitude and longitude and click **"Set Location"**.
5. Use the theme toggle button (☀️/🌙) to switch between light and dark modes.

## Setup
1. **Repository**: The project is hosted at `https://github.com/jasonbra1n/astronomy`.
2. **GitHub Pages**: Configured to serve from the `main` branch, accessible at `https://jasonbra1n.github.io/astronomy/`.
3. **Files**:
   - `index.html`: The main HTML file structuring the web page.
   - `styles.css`: CSS for styling, aligned with the LAB Digital Workshop guide.
   - `script.js`: JavaScript for astronomical calculations and interactivity.
   - `theme.js`: Handles theme switching and synchronization.
   - `astronomy.browser.js`: The Astronomy Engine library (download from [cosinekitty/astronomy](https://github.com/cosinekitty/astronomy)).
4. **Dependencies**:
   - Flatpickr (loaded via CDN for the date picker).
   - `astronomy.browser.js` (must be included in the repository root).

## Notes
- **Time Zone**: All dates and times are displayed in the user's local time zone for consistency.
- **Location Data**: Location is required for rise/set time calculations. Moon phases and eclipse predictions are geocentric and do not require location.
- **Theme Sync**: The `theme.js` script includes logic to listen for `postMessage` events from a parent window, allowing it to sync its theme when embedded in an iframe.

## License
This project uses the Astronomy Engine library, which is licensed under the MIT License. See the library's repository for details.
