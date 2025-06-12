let currentLatitude = null;
let currentLongitude = null;

const datePicker = flatpickr("#dateInput", {
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
    defaultDate: new Date(),
});

function resetToNow() {
    datePicker.setDate(new Date());
    updateInfo();
}

function updateInfo() {
    const selectedDate = datePicker.selectedDates[0] || new Date();
    // Moon Phase
    const phase = Astronomy.MoonPhase(selectedDate);
    let phaseDesc;
    if (phase < 1 || phase > 359) phaseDesc = 'New Moon';
    else if (phase < 89) phaseDesc = 'Waxing Crescent';
    else if (phase < 91) phaseDesc = 'First Quarter';
    else if (phase < 179) phaseDesc = 'Waxing Gibbous';
    else if (phase < 181) phaseDesc = 'Full Moon';
    else if (phase < 269) phaseDesc = 'Waning Gibbous';
    else if (phase < 271) phaseDesc = 'Third Quarter';
    else phaseDesc = 'Waning Crescent';
    const emoji = getMoonEmoji(phase);
    document.getElementById('moonPhase').textContent = `Current Moon Phase: ${emoji} ${phaseDesc} (${phase.toFixed(2)}°)`;

    // Next Full Moon
    const nextFullMoon = Astronomy.SearchMoonPhase(180, selectedDate, 365);
    document.getElementById('nextFullMoon').textContent = nextFullMoon ?
        `Next Full Moon: ${nextFullMoon.date.toLocaleString()}` :
        'Next Full Moon not found within 365 days';

    // Next New Moon
    const nextNewMoon = Astronomy.SearchMoonPhase(0, selectedDate, 365);
    document.getElementById('nextNewMoon').textContent = nextNewMoon ?
        `Next New Moon: ${nextNewMoon.date.toLocaleString()}` :
        'Next New Moon not found within 365 days';

    // Next Eclipse
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

function getMoonEmoji(phase) {
    if (phase < 1 || phase > 359) return '🌑'; // New Moon
    else if (phase < 89) return '🌒'; // Waxing Crescent
    else if (phase < 91) return '🌓'; // First Quarter
    else if (phase < 179) return '🌔'; // Waxing Gibbous
    else if (phase < 181) return '🌕'; // Full Moon
    else if (phase < 269) return '🌖'; // Waning Gibbous
    else if (phase < 271) return '🌗'; // Third Quarter
    else return '🌘'; // Waning Crescent
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

// Initial update
updateInfo();
