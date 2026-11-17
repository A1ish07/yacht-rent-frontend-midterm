const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const WEATHER_TIMEOUT_MS = 8000;

const weatherSection = document.getElementById('weather-section');
const weatherStatus = document.getElementById('weather-status');
const weatherList = document.getElementById('weather-list');
const weatherRefreshBtn = document.getElementById('weather-refresh');

let weatherLoading = false;

const WEATHER_CODES = [
    { codes: [0], text: 'Clear sky', icon: '☀️' },
    { codes: [1, 2], text: 'Mostly clear', icon: '🌤️' },
    { codes: [3], text: 'Overcast', icon: '☁️' },
    { codes: [45, 48], text: 'Fog', icon: '🌫️' },
    { codes: [51, 53, 55, 56, 57], text: 'Drizzle', icon: '🌦️' },
    { codes: [61, 63, 65, 66, 67, 80, 81, 82], text: 'Rain', icon: '🌧️' },
    { codes: [71, 73, 75, 77, 85, 86], text: 'Snow', icon: '❄️' },
    { codes: [95, 96, 97, 99], text: 'Thunderstorm', icon: '⛈️' }
];

function describeWeather(code) {
    const found = WEATHER_CODES.find(item => item.codes.includes(code));
    return found || { text: 'Unknown', icon: '🌡️' };
}


function buildWeatherUrl(places) {
    const latitudes = places.map(place => place.lat).join(',');
    const longitudes = places.map(place => place.lon).join(',');
    return `${WEATHER_API_URL}?latitude=${latitudes}&longitude=${longitudes}` +
        '&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto';
}

async function fetchWeather(places) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WEATHER_TIMEOUT_MS);

    try {
        const response = await fetch(buildWeatherUrl(places), { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`The weather service returned an error (status ${response.status}).`);
        }

        const json = await response.json();
        // Several locations -> array, one location -> single object
        const results = Array.isArray(json) ? json : [json];

        return results
            .map((result, index) => ({ place: places[index], current: result && result.current }))
            .filter(item => item.place && item.current && typeof item.current.temperature_2m === 'number')
            .map(item => ({
                name: item.place.name,
                region: item.place.region,
                temperature: item.current.temperature_2m,
                wind: item.current.wind_speed_10m,
                code: item.current.weather_code
            }));
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('The weather service took too long to respond.');
        }
        if (error instanceof TypeError) {
            throw new Error('Could not connect to the weather service. Check your internet connection.');
        }
        if (error instanceof SyntaxError) {
            throw new Error('The weather service sent data in an unexpected format.');
        }
        throw error;
    } finally {
        clearTimeout(timer);
    }
}


function setWeatherStatus(type, text) {
    weatherStatus.innerHTML = '';
    if (!text) return;

    const box = document.createElement('div');
    if (type === 'loading') {
        box.className = 'd-flex align-items-center gap-2 text-muted';
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border spinner-border-sm';
        spinner.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span');
        label.textContent = text;
        box.append(spinner, label);
    } else {
        box.className = type === 'error' ? 'alert alert-danger mb-3' : 'text-muted';
        box.textContent = text;
    }
    weatherStatus.appendChild(box);
}

function createWeatherCard(item) {
    const info = describeWeather(item.code);

    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card h-100 text-center';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.className = 'h6 mb-2';
    title.textContent = item.name;

    const icon = document.createElement('div');
    icon.className = 'fs-1';
    icon.textContent = info.icon;
    icon.setAttribute('aria-hidden', 'true');

    const temperature = document.createElement('p');
    temperature.className = 'fs-3 fw-bold mb-0';
    temperature.textContent = `${Math.round(item.temperature)}°C`;

    const condition = document.createElement('p');
    condition.className = 'mb-1';
    condition.textContent = info.text;

    const wind = document.createElement('small');
    wind.className = 'text-muted';
    wind.textContent = typeof item.wind === 'number' ? `Wind ${Math.round(item.wind)} km/h` : 'Wind: no data';

    body.append(title, icon, temperature, condition, wind);
    card.appendChild(body);
    col.appendChild(card);
    return col;
}

function renderWeather(items) {
    weatherList.innerHTML = '';
    items.forEach(item => weatherList.appendChild(createWeatherCard(item)));
}

async function loadWeather() {
    if (weatherLoading) return;
    weatherLoading = true;
    if (weatherRefreshBtn) weatherRefreshBtn.disabled = true;

    weatherList.innerHTML = '';
    setWeatherStatus('loading', 'Loading weather…');

    try {
        const items = await fetchWeather(destinations);

        if (items.length === 0) {
            setWeatherStatus('empty', 'No weather data is available for these destinations right now.');
        } else {
            renderWeather(items);
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setWeatherStatus('success', `Current conditions. Updated at ${time}.`);
        }
    } catch (error) {
        setWeatherStatus('error', `${error.message} Press Refresh to try again.`);
    } finally {
        weatherLoading = false;
        if (weatherRefreshBtn) weatherRefreshBtn.disabled = false;
    }
}

if (weatherSection && weatherStatus && weatherList && typeof destinations !== 'undefined') {
    if (weatherRefreshBtn) weatherRefreshBtn.addEventListener('click', loadWeather);
    loadWeather();
}