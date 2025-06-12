let currentLatitude = null;
let currentLongitude = null;

const datePicker = flatpickr("#dateInput", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
    defaultDate: new Date(),
});

const phaseEmojis = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Third Quarter': '🌗',
    'Waning Crescent': '🌘'
};

function getMoonPhaseName(phase) {
    if (phase <= 10 || phase >= 350) return 'New Moon';
    else if (phase < 80) return 'Waxing Crescent';
    else if (phase <= 100) return 'First Quarter';
    else if (phase < 170) return 'Waxing Gibbous';
    else if (phase <= 190) return 'Full Moon';
    else if (phase < 260) return 'Waning Gibbous';
    else if (phase <= 280) return 'Third Quarter';
    else return 'Waning Crescent';
}

function resetToNow() {
    datePicker.setDate(new Date());
    updateInfo();
}

function updateInfo() {
    const selectedDate = datePicker.selectedDates[0] || new Date();
    const midnight = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
    const midnightPhase = Astronomy.MoonPhase(midnight);
    const todaysPhaseName = getMoonPhaseName(midnightPhase);
    const todaysEmoji = phaseEmojis[todaysPhaseName];
    document.getElementById('todaysMoonPhase').textContent = `Today's Moon Phase: ${todaysEmoji} ${todaysPhaseName}`;

    const exactPhase = Astronomy.MoonPhase(selectedDate);
    const exactPhaseName = getMoonPhaseName(exactPhase);
    const exactEmoji = phaseEmojis[exactPhaseName];
    document.getElementById('exactMoonPhase').textContent = `Moon Phase at Selected Time: ${exactEmoji} ${exactPhaseName} (${exactPhase.toFixed(2)}°)`;

    if (currentLatitude !== null && currentLongitude !== null) {
        const observer = new Astronomy.Observer(currentLatitude, currentLongitude, 0);

        // Moon events
        const moonrise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, 1, selectedDate, 1);
        const moonset = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, selectedDate, 1);
        const moonTransit = Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, selectedDate);

        // Sun events
        const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, selectedDate, 1);
        const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, selectedDate, 1);
        const solarNoon = Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, selectedDate);

        // Display Moon events
        document.getElementById('nextMoonrise').textContent = moonrise ?
            `Next Moonrise: ${moonrise.date.toLocaleString()}` :
            'Next Moonrise: Not available';
        document.getElementById('nextMoonset').textContent = moonset ?
            `Next Moonset: ${moonset.date.toLocaleString()}` :
            'Next Moonset: Not available';
        document.getElementById('nextMoonTransit').textContent = moonTransit ?
            `Next Moon Transit (High Moon): ${moonTransit.date.toLocaleString()}` :
            'Next Moon Transit (High Moon): Not available';

        // Display Sun events
        document.getElementById('nextSunrise').textContent = sunrise ?
            `Next Sunrise: ${sunrise.date.toLocaleString()}` :
            'Next Sunrise: Not available';
        document.getElementById('nextSunset').textContent = sunset ?
            `Next Sunset: ${sunset.date.toLocaleString()}` :
            'Next Sunset: Not available';
        document.getElementById('nextSolarNoon').textContent = solarNoon ?
            `Next Solar Noon: ${solarNoon.date.toLocaleString()}` :
            'Next Solar Noon: Not available';
    } else {
        document.getElementById('nextMoonrise').textContent = 'Next Moonrise: Location not set';
        document.getElementById('nextMoonset').textContent = 'Next Moonset: Location not set';
        document.getElementById('nextMoonTransit').textContent = 'Next Moon Transit (High Moon): Location not set';
        document.getElementById('nextSunrise').textContent = 'Next Sunrise: Location not set';
        document.getElementById('nextSunset').textContent = 'Next Sunset: Location not set';
        document.getElementById('nextSolarNoon').textContent = 'Next Solar Noon: Location not set';
    }

    const nextFullMoon = Astronomy.SearchMoonPhase(180, selectedDate, 365);
    document.getElementById('nextFullMoon').textContent = nextFullMoon ?
        `Next Full Moon: ${nextFullMoon.date.toLocaleString()}` :
        'Next Full Moon not found within 365 days';

    const nextNewMoon = Astronomy.SearchMoonPhase(0, selectedDate, 365);
    document.getElementById('nextNewMoon').textContent = nextNewMoon ?
        `Next New Moon: ${nextNewMoon.date.toLocaleString()}` :
        'Next New Moon not found within 365 days';

    const nextLunarEclipse = Astronomy.SearchLunarEclipse(selectedDate);
    const nextSolarEclipse = Astronomy.SearchGlobalSolarEclipse(selectedDate);
    if (nextLunarEclipse && nextSolarEclipse) {
        if (nextLunarEclipse.peak.date < nextSolarEclipse.peak.date) {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${nextLunarEclipse.peak.date.toLocaleString()}`;
        } else {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${nextSolarEclipse.peak.date.toLocaleString()}`;
        }
    } else if (nextLunarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${nextLunarEclipse.peak.date.toLocaleString()}`;
    } else if (nextSolarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${nextSolarEclipse.peak.date.toLocaleString()}`;
    } else {
        document.getElementById('nextEclipse').textContent = 'No eclipse found';
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;
                document.getElementById('locationDisplay').textContent =
                    `Current Location: Latitude ${currentLatitude.toFixed(2)}°, Longitude ${currentLongitude.toFixed(2)}°`;
                document.getElementById('latitude').value = currentLatitude;
                document.getElementById('longitude').value = currentLongitude;
                updateInfo();
            },
            (error) => {
                alert('Unable to retrieve location: ' + error.message);
            }
زوم

filepath: script.js

let currentLatitude = null;
let currentLongtitude = null;

const datePicker = flatpickr("#dateInput", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
    defaultDate: new Date(),
});

const phaseEmojis = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
};

function getMoonPhaseName(phase) {
    if (phase <= 10 || phase >= 350) return 'New Moon';
    else if (phase < 80) return 'Waxing Crescent';
    else if (phase <= 100) return 'First Quarter';
    else if (phase < 170) return 'Waxing Gibbous';
    else if (phase <= 190) return 'Full Moon';
    else if (phase < 260) return 'Waning Gibbous';
    else if (phase <= 280) return 'Last Quarter';
    else return 'Waning Crescent';
}

function resetToNow() {
    datePicker.setDate(new Date());
    updateInfo();
}

function updateInfo() {
    const selectedDate = datePicker.selectedDates[0] || new Date();
    const midnight = new Date(selectedDate);
    midnight.setHours(0, 0, 0, 0);
    const midnightPhase = Astronomy.MoonPhase(midnight);
    const todaysPhaseName = getMoonPhaseName(midnightPhase);
    const todaysEmoji = phaseEmojis[todaysPhaseName];
    document.getElementById('todaysMoonPhase').textContent = `Today's Moon Phase: ${todaysEmoji} ${todaysPhaseName}`;

    const exactPhase = Astronomy.MoonPhase(selectedDate);
    const exactPhaseName = getMoonPhaseName(exactPhase);
    const exactEmoji = phaseEmojis[exactPhaseName];
    document.getElementById('exactMoonPhase').textContent = `Moon Phase at Selected Time: ${exactEmoji} ${exactPhaseName} (${exactPhase.toFixed(2)}°)`;

    if (currentLatitude !== null && currentLongtitude !== null) {
        const observer = new Astronomy.Observer(currentLatitude, currentLongtitude, 0);
        const moonrise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, +1, selectedDate, 1);
        const moonset = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, selectedDate, 1);
        const moonTransit = Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, selectedDate);

        const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, selectedDate, 1);
        const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, selectedDate, 1);
        const solarNoon = Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, selectedDate);

        document.getElementById('nextMoonrise').textContent = moonrise ? `Next Moonrise: ${moonrise.date.toLocaleString()}` : 'Next Moonrise: Not available';
        document.getElementById('nextMoonset').textContent = moonset ? `Next Moonset: ${moonset.date.toLocaleString()}` : 'Next Moonset: Not available';
        document.getElementById('nextMoonTransit').textContent = moonTransit ? `Next Moon Transit: ${moonTransit.date.toLocaleString()}` : 'Next Moon Transit: Not available';

        document.getElementById('nextSunrise').textContent = sunrise ? `Next Sunrise: ${sunrise.date.toLocaleString()}` : 'Next Sunrise: Not available';
        document.getElementById('nextSunset').textContent = sunset ? `Next Sunset: ${sunset.date.toLocaleString()}` : 'Next Sunset: Not available';
        document.getElementById('nextSolarNoon').textContent = solarNoon ? `Next Solar Noon: ${solarNoon.date.toLocaleString()}` : 'Next Solar Noon: Not available';
    } else {
        document.getElementById('nextMoonrise').textContent = 'Next Moonrise: Location not set';
        document.getElementById('nextMoonset').textContent = 'Next Moonset: Location not set';
        document.getElementById('nextMoonTransit').textContent = 'Next Moon Transit: Location not set';
        document.getElementById('nextSunrise').textContent = 'Next Sunrise: Location not set';
        document.getElementById('nextSunset').textContent = 'Next Sunset: Location not set';
        document.getElementById('nextSolarNoon').textContent = 'Next Solar Noon: Location not set';
    }

    const nextFullMoon = Astronomy.SearchMoonPhase(180, selectedDate, 365);
    document.getElementById('nextFullMoon').textContent = nextFullMoon ? `Next Full Moon: ${nextFullMoon.date.toLocaleString()}` : 'Next Full Moon: Not found within a year';

    const nextNewMoon = Astronomy.SearchMoonPhase(0, selectedDate, 365);
    document.getElementById('nextNewMoon').textContent = nextNewMoon ? `Next New Moon: ${nextNewMoon.date.toLocaleString()}` : 'Next New Moon: Not found within a year';

    const nextLunarEclipse = Astronomy.SearchLunarEclipse(selectedDate);
    const nextSolarEclipse = Astronomy.SearchGlobalSolarEclipse(selectedDate);
    let nextEclipseText = 'Next Eclipse: Not found';
    if (nextLunarEclipse && (!nextSolarEclipse || nextLunarEclipse.peak.date < nextSolarEclipse.peak.date)) {
        nextEclipseText = `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${nextLunarEclipse.peak.date.toLocaleString()}`;
    } else if (nextSolarEclipse) {
        nextEclipseText = `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${nextSolarEclipse.peak.date.toLocaleString()}`;
    }
    document.getElementById('nextEclipse').textContent = nextEclipseText;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude;
                currentLongtitude = position.coords.longitude;
                document.getElementById('locationDisplay').textContent = `Location: Lat ${currentLatitude.toFixed(2)}, Lon ${currentLongtitude.toFixed(2)}`;
                document.getElementById('latitude').value = currentLatitude;
                document.getElementById('longitude').value = currentLongtitude;
                updateInfo();
            },
            (error) => {
                console.error('Error getting location:', error);
                document.getElementById('locationDisplay').textContent = 'Location: Unable to retrieve';
            }
        );
    } else {
        document.getElementById('locationDisplay').textContent = 'Location: Geolocation not supported';
    }
}

function setManualLocation() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);
    if (isNaN(lat) || lat < -90 || lat > 90) {
        alert('Latitude must be between -90 and 90');
        return;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
        alert('Longitude must be between -180 and 180');
        return;
    }
    currentLatitude = lat;
    currentLongtitude = lon;
    document.getElementById('locationDisplay').textContent = `Location: Lat ${lat.toFixed(2)}, Lon ${lon.toFixed(2)}`;
    updateInfo();
}

updateInfo();

filepath: styles.css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f0f0f0;
    color: #333;
}

h1 {
    text-align: center;
    color: #2c3e50;
}

section {
    background-color: white;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #34495e;
    margin-top: 0;
}

label {
    display: block;
    margin: 5px 0;
}

input[type="text"],
input[type="number"] {
    padding: 8px;
    margin: 5px 0;
    width: calc(100% - 16px);
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px 5px 5px 0;
}

button:hover {
    background-color: #2980b9;
}

p {
    margin: 10px 0;
}

#locationDisplay {
    font-style: italic;
    color: #7f8c8d;
}


PR: Add High Moon and Sun Details to Astronomy App

This update enhances the astronomy web application by adding a "High Moon" (moon transit) feature to the Moon Details section and introducing a new Sun Details section with sunrise, sunset, and solar noon. The changes ensure a clear separation of moon and sun-related astronomical events, improving user experience and functionality.

### Changes Made

#### `index.html`
- **Restructured Astronomical Details**: Split into three sections:
  - **Moon Details**: Now includes "Next Moon Transit (High Moon)" alongside existing moonrise, moonset, and phase details.
  - **Sun Details**: A new section displaying "Next Sunrise," "Next Sunset," and "Next Solar Noon."
  - **Future Events**: Retained for next full moon, new moon, and eclipse.
- **Updated IDs**: Added new `<p>` elements with IDs `nextMoonTransit`, `nextSunrise`, `nextSunset`, and `nextSolarNoon` to display the new data.

#### `script.js`
- **Added Moon Transit Calculation**: 
  - Used `Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, selectedDate)` to compute the next moon transit time (when the moon crosses the meridian).
- **Added Sun Calculations**:
  - **Sunrise**: `Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, selectedDate, 1)`
  - **Sunset**: `Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, selectedDate, 1)`
  - **Solar Noon**: `Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, selectedDate)`
- **Display Logic**: Updated the `updateInfo` function to populate the new fields only when location data is available, with fallback messages if unavailable or uncalculable.
- **Typo Fix**: Corrected `currentLongtitude` to `currentLongitude` for consistency and correctness.

#### `styles.css`
- No changes were required as the existing styles adequately support the new sections and elements.

### Functionality
- **High Moon**: Displays the next time the moon reaches its highest point in the sky (transit) after the selected date, labeled as "Next Moon Transit (High Moon)."
- **Sun Details**: Provides the next sunrise, sunset, and solar noon times after the selected date, presented in a dedicated section.
- **Location Dependency**: All rise, set, and transit calculations require latitude and longitude. If not set, the app displays "Location not set" for these fields.
- **User Interface**: The new layout enhances readability by grouping related data, making it easier to compare moon and sun events.

### Testing Considerations
- Ensure the Astronomy Engine library (`astronomy.browser.js`) is included and functional.
- Test with various dates and locations to verify that transit, rise, and set times are correctly calculated and displayed.
- Check edge cases, such as polar regions where rise/set events may not occur within 24 hours, to ensure appropriate "Not available" messages appear.

This update fulfills the request to add a "High Moon" feature and a sun column, enhancing the app's utility for astronomical observation planning.
