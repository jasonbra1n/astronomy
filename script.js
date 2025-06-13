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
    const selectedDate = new Date(datePicker.selectedDates[0] || new Date());
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

        const moonrise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, 1, selectedDate, 1);
        const moonset = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, selectedDate, 1);
        const moonTransit = Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, selectedDate);
        const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, selectedDate, 1);
        const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, selectedDate, 1);
        const solarNoon = Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, selectedDate);

        document.getElementById('nextMoonrise').textContent = moonrise && moonrise.date ?
            `Next Moonrise: ${moonrise.date.toLocaleString()}` :
            'Next Moonrise: Not available';
        document.getElementById('nextMoonset').textContent = moonset && moonset.date ?
            `Next Moonset: ${moonset.date.toLocaleString()}` :
            'Next Moonset: Not available';
        document.getElementById('nextMoonTransit').textContent = moonTransit && moonTransit.time ?
            `Next Moon Transit (High Moon): ${new Date(moonTransit.time).toLocaleString()}` :
            'Next Moon Transit (High Moon): Not available';
        document.getElementById('nextSunrise').textContent = sunrise && sunrise.date ?
            `Next Sunrise: ${sunrise.date.toLocaleString()}` :
            'Next Sunrise: Not available';
        document.getElementById('nextSunset').textContent = sunset && sunset.date ?
            `Next Sunset: ${sunset.date.toLocaleString()}` :
            'Next Sunset: Not available';
        document.getElementById('nextSolarNoon').textContent = solarNoon && solarNoon.time ?
            `Next Solar Noon: ${new Date(solarNoon.time).toLocaleString()}` :
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
    updateInfo();
}

updateInfo();
