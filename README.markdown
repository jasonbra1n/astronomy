# Astronomy Information Web Page

This GitHub Pages site displays astronomical information based on the user's local date, time, and optionally their location. It uses the Astronomy Engine library (`astronomy.browser.js`) for calculations and is hosted at `https://jasonbra1n.github.io/astronomy/`.

## Features
- **Today's Moon Phase**: Displays the moon phase for the entire day (e.g., "Full Moon") based on the phase at midnight local time, with an emoji visualization (e.g., 🌕).
- **Exact Moon Phase**: Shows the precise moon phase at the selected date and time, including the phase angle in degrees.
- **Moonrise and Moonset Times**: Provides the next moonrise and moonset times for the selected date, if a location is set.
- **Next Full Moon**: Date and time of the upcoming full moon.
- **Next New Moon**: Date and time of the upcoming new moon.
- **Next Eclipse**: Type (lunar or solar) and date of the next eclipse.
- **Date and Time Input**: Uses Flatpickr (via CDN) for an intuitive date/time picker, with a "Reset to Now" option to revert to the current local time.
- **Location Support**: Allows setting a location via the browser's Geolocation API or manual latitude/longitude input, used for moonrise/moonset calculations.
- **Responsive Design**: Features a space-themed, dark-background layout for a clean and modern look.

## Usage
1. Visit `https://jasonbra1n.github.io/astronomy/`.
2. The page defaults to the current local date and time (e.g., 12:34 PM EDT on June 12, 2025).
3. Use the date picker to select a different date and time, then click "Update" to refresh the astronomical details.
4. Click "Reset to Now" to revert to the current local time.
5. Optionally, click "Get Current Location" to use your device's location, or manually enter latitude (-90 to 90) and longitude (-180 to 180) and click "Set Location" to enable moonrise/moonset calculations.
6. View the astronomical details, including:
   - Today's Moon Phase (e.g., 🌕 Full Moon).
   - Exact Moon Phase at the selected time (e.g., 🌕 Full Moon (180.0°)).
   - Next Moonrise and Moonset (if location is set).
   - Dates for the next full moon, new moon, and eclipse.

## Setup
1. **Repository**: The project is hosted at `https://github.com/jasonbra1n/astronomy`.
2. **GitHub Pages**: Configured to serve from the `main` branch, accessible at `https://jasonbra1n.github.io/astronomy/`.
3. **Files**:
   - `index.html`: The main HTML file structuring the web page.
   - `styles.css`: CSS for the space-themed styling.
   - `script.js`: JavaScript for astronomical calculations and interactivity.
   - `astronomy.browser.js`: The Astronomy Engine library (download from [cosinekitty/astronomy](https://github.com/cosinekitty/astronomy)).
   - `README.markdown`: This documentation file.
4. **Dependencies**:
   - Flatpickr (loaded via CDN for the date picker).
   - `astronomy.browser.js` (must be included in the repository root).
5. **Deployment**:
   - Upload all files to the `main` branch of the repository.
   - Ensure GitHub Pages is enabled in the repository settings under **Settings > Pages**, set to the `main` branch.

## Notes
- **Time Zone**: All dates and times are displayed in the user's local time zone for consistency.
- **Location**: Optional and used only for moonrise and moonset calculations. Moon phases and eclipses are geocentric and do not require location data.
- **Moon Phase Logic**:
  - "Today's Moon Phase" is calculated at midnight of the selected date and applies to the entire day using thresholds (e.g., 170°–190° for Full Moon).
  - "Exact Moon Phase" reflects the precise phase at the selected time.
- **Future Enhancements**:
  - Add local eclipse visibility based on location.
  - Include planetary positions or other celestial events.
  - Enhance the moon phase visualization with a canvas-based graphic.

## License
This project uses the Astronomy Engine library, which is licensed under the MIT License. See the library's repository for details.
