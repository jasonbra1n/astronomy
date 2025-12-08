let currentLatitude = null;
let currentLongitude = null;

// Cache DOM elements for better performance and readability
const elements = {
    dateInput: document.getElementById('dateInput'),
    citySelect: document.getElementById('citySelect'),
    latitudeInput: document.getElementById('latitude'),
    longitudeInput: document.getElementById('longitude'),
    locationDisplay: document.getElementById('locationDisplay'),
    todaysMoonPhase: document.getElementById('todaysMoonPhase'),
    exactMoonPhase: document.getElementById('exactMoonPhase'),
    nextMoonrise: document.getElementById('nextMoonrise'),
    nextMoonset: document.getElementById('nextMoonset'),
    nextMoonTransit: document.getElementById('nextMoonTransit'),
    moonUpTime: document.getElementById('moonUpTime'),
    nextSunrise: document.getElementById('nextSunrise'),
    nextSunset: document.getElementById('nextSunset'),
    nextSolarNoon: document.getElementById('nextSolarNoon'),
    dayLength: document.getElementById('dayLength'),
    nextFullMoon: document.getElementById('nextFullMoon'),
    nextNewMoon: document.getElementById('nextNewMoon'),
    nextEclipse: document.getElementById('nextEclipse'),
};

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

// Populate city dropdown
popularCities.forEach(city => {
  const option = document.createElement('option');
  option.value = `${city.lat},${city.lon}`;
  option.textContent = city.name;
  elements.citySelect.appendChild(option);
});

// Apply city coordinates on selection
elements.citySelect.addEventListener('change', function() {
  const [lat, lon] = this.value.split(',');
  if (lat && lon) {
    elements.latitudeInput.value = lat;
    elements.longitudeInput.value = lon;
    currentLatitude = parseFloat(lat);
    currentLongitude = parseFloat(lon);
    document.getElementById('locationDisplay').textContent =
        `Current Location: ${citySelect.options[citySelect.selectedIndex].text}`;
    updateInfo();
  }
});

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

function updateMoonDetails(selectedDate) {
    const midnight = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
    const midnightPhase = Astronomy.MoonPhase(midnight);
    const todaysPhaseName = getMoonPhaseName(midnightPhase);
    const todaysEmoji = phaseEmojis[todaysPhaseName];
    elements.todaysMoonPhase.textContent = `Today's Moon Phase: ${todaysEmoji} ${todaysPhaseName}`;

    const exactPhase = Astronomy.MoonPhase(selectedDate);
    const exactPhaseName = getMoonPhaseName(exactPhase);
    const exactEmoji = phaseEmojis[exactPhaseName];
    elements.exactMoonPhase.textContent = `Moon Phase at Selected Time: ${exactEmoji} ${exactPhaseName} (${exactPhase.toFixed(2)}°)`;
}

function formatDate(date) {
    return date ? new Date(date).toLocaleString() : 'Not available';
}

function calculateTimeDifference(startTime, endTime) {
    if (!startTime || !endTime) return null;
    let diffMs = endTime - startTime;
    if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // Handle events crossing midnight
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

function updateRiseSetTimes(selectedDate) {
    if (currentLatitude !== null && currentLongitude !== null) {
        const observer = new Astronomy.Observer(currentLatitude, currentLongitude, 0);

        const moonrise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, 1, selectedDate, 1);
        const moonset = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, selectedDate, 1);
        const moonTransit = Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, selectedDate);
        
        elements.nextMoonrise.textContent = `Next Moonrise: ${formatDate(moonrise?.date)}`;
        elements.nextMoonset.textContent = `Next Moonset: ${formatDate(moonset?.date)}`;
        elements.nextMoonTransit.textContent = `Next Moon Transit (High Moon): ${formatDate(moonTransit?.time.date)}`;

        const moonUpDuration = calculateTimeDifference(moonrise?.date, moonset?.date);
        elements.moonUpTime.textContent = moonUpDuration ? `Moon Up Time: ${moonUpDuration}` : 'Moon Up Time: Not available';

        const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, selectedDate, 1);
        const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, selectedDate, 1);
        const solarNoon = Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, selectedDate);

        elements.nextSunrise.textContent = `Next Sunrise: ${formatDate(sunrise?.date)}`;
        elements.nextSunset.textContent = `Next Sunset: ${formatDate(sunset?.date)}`;
        elements.nextSolarNoon.textContent = `Next Solar Noon: ${formatDate(solarNoon?.time.date)}`;

        const dayDuration = calculateTimeDifference(sunrise?.date, sunset?.date);
        elements.dayLength.textContent = dayDuration ? `Day Length: ${dayDuration}` : 'Day Length: Not available';
    } else {
        ['nextMoonrise', 'nextMoonset', 'nextMoonTransit', 'moonUpTime', 'nextSunrise', 'nextSunset', 'nextSolarNoon', 'dayLength'].forEach(id => {
            const baseText = elements[id].textContent.split(':')[0];
            elements[id].textContent = `${baseText}: Location not set`;
        });
    }
}

function updateFutureEvents(selectedDate) {
    const nextFullMoon = Astronomy.SearchMoonPhase(180, selectedDate, 365);
    elements.nextFullMoon.textContent = nextFullMoon ?
        `Next Full Moon: ${formatDate(nextFullMoon.date)}` :
        'Next Full Moon not found within 365 days';

    const nextNewMoon = Astronomy.SearchMoonPhase(0, selectedDate, 365);
    elements.nextNewMoon.textContent = nextNewMoon ?
        `Next New Moon: ${formatDate(nextNewMoon.date)}` :
        'Next New Moon not found within 365 days';

    const nextLunarEclipse = Astronomy.SearchLunarEclipse(selectedDate);
    const nextSolarEclipse = Astronomy.SearchGlobalSolarEclipse(selectedDate);

    if (nextLunarEclipse && nextSolarEclipse) {
        if (nextLunarEclipse.peak.date < nextSolarEclipse.peak.date) {
            elements.nextEclipse.textContent =
                `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${formatDate(nextLunarEclipse.peak.date)}`;
        } else {
            elements.nextEclipse.textContent =
                `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${formatDate(nextSolarEclipse.peak.date)}`;
        }
    } else if (nextLunarEclipse) {
        elements.nextEclipse.textContent =
            `Next Eclipse: ${nextLunarEclipse.kind} Lunar on ${formatDate(nextLunarEclipse.peak.date)}`;
    } else if (nextSolarEclipse) {
        elements.nextEclipse.textContent =
            `Next Eclipse: ${nextSolarEclipse.kind} Solar on ${formatDate(nextSolarEclipse.peak.date)}`;
    } else {
        elements.nextEclipse.textContent = 'No eclipse found';
    }
}

function updateInfo() {
    const selectedDate = new Date(datePicker.selectedDates[0] || new Date());
    updateMoonDetails(selectedDate);
    updateRiseSetTimes(selectedDate);
    updateFutureEvents(selectedDate);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLatitude = position.coords.latitude;
                currentLongitude = position.coords.longitude;
                elements.locationDisplay.textContent =
                    `Current Location: Latitude ${currentLatitude.toFixed(2)}°, Longitude ${currentLongitude.toFixed(2)}°`;
                elements.latitudeInput.value = currentLatitude;
                elements.longitudeInput.value = currentLongitude;
                updateInfo();
            },
            (error) => {
                let message = 'Unable to retrieve location. Please check your browser settings.';
                if (error.code === error.PERMISSION_DENIED) message = 'Location access was denied.';
                alert(message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function setManualLocation() {
    const lat = parseFloat(elements.latitudeInput.value);
    const lon = parseFloat(elements.longitudeInput.value);
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
    elements.locationDisplay.textContent =
        `Current Location: Latitude ${lat.toFixed(2)}°, Longitude ${lon.toFixed(2)}°`;
    updateInfo();
}

updateInfo();
