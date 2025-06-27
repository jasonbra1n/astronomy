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

const popularCities = [
  { name: "New York, USA", lat: 40.7128, lon: -74.0060 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo, Japan", lat: 35.6895, lon: 139.6917 },
  { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Los Angeles, USA", lat: 34.0522, lon: -118.2437 },
  { name: "Toronto, Canada", lat: 43.6532, lon: -79.3832 },
  { name: "Berlin, Germany", lat: 52.5200, lon: 13.4050 },
  { name: "Moscow, Russia", lat: 55.7558, lon: 37.6173 },
  { name: "Beijing, China", lat: 39.9042, lon: 116.4074 },
  { name: "Mexico City, Mexico", lat: 19.4326, lon: -99.1332 },
  { name: "São Paulo, Brazil", lat: -23.5505, lon: -46.6333 },
  { name: "Cairo, Egypt", lat: 30.0444, lon: 31.2357 },
  { name: "Istanbul, Turkey", lat: 41.0082, lon: 28.9784 },
  { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708 },
  { name: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
  { name: "Johannesburg, South Africa", lat: -26.2041, lon: 28.0473 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
  { name: "Seoul, South Korea", lat: 37.5665, lon: 126.9780 },
  { name: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
  { name: "Chicago, USA", lat: 41.8781, lon: -87.6298 },
  { name: "Bangkok, Thailand", lat: 13.7563, lon: 100.5018 },
  { name: "Buenos Aires, Argentina", lat: -34.6037, lon: -58.3816 },
  { name: "Amsterdam, Netherlands", lat: 52.3676, lon: 4.9041 },
  { name: "Vienna, Austria", lat: 48.2082, lon: 16.3738 },
  { name: "San Francisco, USA", lat: 37.7749, lon: -122.4194 },
  { name: "Lagos, Nigeria", lat: 6.5244, lon: 3.3792 },
  { name: "Jakarta, Indonesia", lat: -6.2088, lon: 106.8456 },
  { name: "Shanghai, China", lat: 31.2304, lon: 121.4737 },
  { name: "Lima, Peru", lat: -12.0464, lon: -77.0428 },
  { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lon: 101.6869 },
  { name: "Zurich, Switzerland", lat: 47.3769, lon: 8.5417 },
  { name: "Stockholm, Sweden", lat: 59.3293, lon: 18.0686 },
  { name: "Oslo, Norway", lat: 59.9139, lon: 10.7522 },
  { name: "Brussels, Belgium", lat: 50.8503, lon: 4.3517 },
  { name: "Budapest, Hungary", lat: 47.4979, lon: 19.0402 },
  { name: "Warsaw, Poland", lat: 52.2297, lon: 21.0122 },
  { name: "Prague, Czechia", lat: 50.0755, lon: 14.4378 },
  { name: "Santiago, Chile", lat: -33.4489, lon: -70.6693 },
  { name: "Athens, Greece", lat: 37.9838, lon: 23.7275 },
  { name: "Copenhagen, Denmark", lat: 55.6761, lon: 12.5683 },
  { name: "Helsinki, Finland", lat: 60.1699, lon: 24.9384 },
  { name: "Manila, Philippines", lat: 14.5995, lon: 120.9842 },
  { name: "Riyadh, Saudi Arabia", lat: 24.7136, lon: 46.6753 },
  { name: "Ankara, Turkey", lat: 39.9334, lon: 32.8597 },
  { name: "Dublin, Ireland", lat: 53.3498, lon: -6.2603 },
  { name: "Edinburgh, UK", lat: 55.9533, lon: -3.1883 }
];

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
            `Next Moonrise: ${new Date(moonrise.date).toLocaleString()}` :
            'Next Moonrise: Not available';
        document.getElementById('nextMoonset').textContent = moonset && moonset.date ?
            `Next Moonset: ${new Date(moonset.date).toLocaleString()}` :
            'Next Moonset: Not available';
        document.getElementById('nextMoonTransit').textContent = moonTransit && moonTransit.time ?
            `Next Moon Transit (High Moon): ${new Date(moonTransit.time).toLocaleString()}` :
            'Next Moon Transit (High Moon): Not available';

        const moonriseTime = moonrise && moonrise.date ? new Date(moonrise.date) : null;
        const moonsetTime = moonset && moonset.date ? new Date(moonset.date) : null;
        
        if (moonriseTime && moonsetTime) {
            let diffMs = moonsetTime - moonriseTime;
            if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // handle moonset after midnight
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('moonUpTime').textContent = `Moon Up Time: ${hours}h ${minutes}m`;
        } else if (!moonriseTime && !moonsetTime) {
            document.getElementById('moonUpTime').textContent = 'Moon Up Time: Not available (moon does not rise or set today)';
        } else if (!moonriseTime) {
            document.getElementById('moonUpTime').textContent = 'Moon Up Time: Not available (moon does not rise today)';
        } else {
            document.getElementById('moonUpTime').textContent = 'Moon Up Time: Not available (moon does not set today)';
        }

        const sunriseTime = sunrise && sunrise.date ? new Date(sunrise.date) : null;
        const sunsetTime = sunset && sunset.date ? new Date(sunset.date) : null;
        
        document.getElementById('nextSunrise').textContent = sunriseTime ?
            `Next Sunrise: ${sunriseTime.toLocaleString()}` :
            'Next Sunrise: Not available';
        document.getElementById('nextSunset').textContent = sunsetTime ?
            `Next Sunset: ${sunsetTime.toLocaleString()}` :
            'Next Sunset: Not available';
        document.getElementById('nextSolarNoon').textContent = solarNoon && solarNoon.time ?
            `Next Solar Noon: ${new Date(solarNoon.time).toLocaleString()}` :
            'Next Solar Noon: Not available';

// Calculate and display day length
if (sunriseTime && sunsetTime) {
    let diffMs = sunsetTime - sunriseTime;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // handle sunset after midnight
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('dayLength').textContent = `Day Length: ${hours}h ${minutes}m`;
} else {
    document.getElementById('dayLength').textContent = 'Day Length: Not available';
}
        
    } else {
        document.getElementById('nextMoonrise').textContent = 'Next Moonrise: Location not set';
        document.getElementById('nextMoonset').textContent = 'Next Moonset: Location not set';
        document.getElementById('nextMoonTransit').textContent = 'Next Moon Transit (High Moon): Location not set';
        document.getElementById('nextSunrise').textContent = 'Next Sunrise: Location not set';
        document.getElementById('nextSunset').textContent = 'Next Sunset: Location not set';
        document.getElementById('nextSolarNoon').textContent = 'Next Solar Noon: Location not set';
        document.getElementById('dayLength').textContent = 'Day Length: Location not set';
        document.getElementById('moonUpTime').textContent = 'Moon Up Time: Location not set';
    }

    const nextFullMoon = Astronomy.SearchMoonPhase(180, selectedDate, 365);
    document.getElementById('nextFullMoon').textContent = nextFullMoon ?
        `Next Full Moon: ${new Date(nextFullMoon.date).toLocaleString()}` :
        'Next Full Moon not found within 365 days';

    const nextNewMoon = Astronomy.SearchMoonPhase(0, selectedDate, 365);
    document.getElementById('nextNewMoon').textContent = nextNewMoon ?
        `Next New Moon: ${new Date(nextNewMoon.date).toLocaleString()}` :
        'Next New Moon not found within 365 days';

    const nextLunarEclipse = Astronomy.SearchLunarEclipse(selectedDate);
    const nextSolarEclipse = Astronomy.SearchGlobalSolarEclipse(selectedDate);
    if (nextLunarEclipse && nextSolarEclipse) {
        if (nextLunarEclipse.peak.date < nextSolarEclipse.peak.date) {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${new Date(nextLunarEclipse.peak.date).toLocaleString()}`;
        } else {
            document.getElementById('nextEclipse').textContent =
                `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${new Date(nextSolarEclipse.peak.date).toLocaleString()}`;
        }
    } else if (nextLunarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${new Date(nextLunarEclipse.peak.date).toLocaleString()}`;
    } else if (nextSolarEclipse) {
        document.getElementById('nextEclipse').textContent =
            `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${new Date(nextSolarEclipse.peak.date).toLocaleString()}`;
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
