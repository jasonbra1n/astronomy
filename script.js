let currentLatitude = null;
let currentLongitude = null;

function updateInfo() {
    const dateText = document.getElementById('dateInput').value;
    let date;
    if (dateText) {
        const parsedText = dateText.replace(' ', 'T') + 'Z';
        date = new Date(parsedText);
        if (isNaN(date.getTime())) {
            alert('Invalid date format. Please use YYYY-MM-DD HH:MM:SS');
            return;
        }
    } else {
        date = new Date();
    }

    // Moon Phase
    const phase = Astronomy.MoonPhase(date);
    let phaseDesc;
    if (phase < 0.01 || phase > 359.99) phaseDesc = 'New Moon';
    else if (phase < 90) phaseDesc = 'Waxing Crescent';
    else if (phase < 90.01) phaseDesc = 'First Quarter';
    else if (phase < 180) phaseDesc = 'Waxing Gibbous';
    else if (phase < 180.01) phaseDesc = 'Full Moon';
    else if (phase < 270) phaseDesc = 'Waning Gibbous';
    else if (phase < 270.01) phaseDesc = 'Third Quarter';
    else phaseDesc = 'Waning Crescent';
    document.getElementById('moonPhase').textContent = `Current Moon Phase: ${phaseDesc} (${phase.toFixed(2)}°)`;

    // Next Full Moon
    const nextFullMoon = Astronomy.SearchMoonPhase(180, date, 365);
    document.getElementById('nextFullMoon').textContent = nextFullMoon ?
        `Next Full Moon: ${nextFullMoon.date.toUTCString()}` :
        'Next Full Moon not found within 365 days';

    // Next New Moon
    const nextNewMoon = Astronomy.SearchMoonPhase(0, date, 365);
    document.getElementById('nextNewMoon').textContent = nextNewMoon ?
        `Next New Moon: ${nextNewMoon.date.toUTCString()}` :
        'Next New Moon not found within 365 days';

    // Next Eclipse
    const nextLunarEclipse = Astronomy.SearchLunarEclipse(date);
    const nextSolarEclipse = Astronomy.SearchGlobalSolarEclipse(date);
    if (nextLunarEclipse && nextSolarEclipse) {
        if (nextLunarEclipse.peak.date < nextSolarEclipse.peak.date) {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${nextLunarEclipse.peak.date.toUTCString()}`;
        } else {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${nextSolarEclipse.peak.date.toUTCString()}`;
        }
    } else if (nextLunarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${nextLunarEclipse.peak.date.toUTCString()}`;
    } else if (nextSolarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${nextSolarEclipse.peak.date.toUTCString()}`;
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
            },
            (error) => {
                alert('Unable to retrieve location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function setManualLocation() {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);
    if (isNaN(lat) || lat < -90 || lat > 90) {
        alert('Latitude must be between -90 and 90 degrees.');
        return;
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
        alert('Longitude must be between -180 and 180 degrees.');
        return;
    }
    currentLatitude = lat;
    currentLongitude = lon;
    document.getElementById('locationDisplay').textContent =
        `Current Location: Latitude ${lat.toFixed(2)}°, Longitude ${lon.toFixed(2)}°`;
}

// Set initial date to current UTC time
const now = new Date();
document.getElementById('dateInput').value = now.toISOString().replace('T', ' ').substring(0, 19);

// Initial update
updateInfo();
