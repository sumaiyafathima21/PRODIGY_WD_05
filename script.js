const apiKey = "10ffef1bd7bb5b98b1f179ad30fdc4a9"; 
const weatherContainer = document.getElementById("weatherContainer");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Fetch weather by coordinates
function fetchWeatherByCoords(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=10ffef1bd7bb5b98b1f179ad30fdc4a9&units=metric`
  )
    .then(res => res.json())
    .then(showWeather)
    .catch(() => {
      weatherContainer.innerHTML = `<p>❌ Unable to fetch weather data</p>`;
    });
}

// Fetch weather by city
function fetchWeatherByCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10ffef1bd7bb5b98b1f179ad30fdc4a9&units=metric`
  )
    .then(res => res.json())
    .then(showWeather)
    .catch(() => {
      weatherContainer.innerHTML = `<p>City not found 😢</p>`;
    });
}

// Display weather info
function showWeather(data) {
  if (data.cod !== 200) {
    weatherContainer.innerHTML = `<p>⚠️ ${data.message}</p>`;
    return;
  }

  const { name, main, weather, wind } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherContainer.innerHTML = `
    <h2>${name}</h2>
    <img src="${icon}" alt="${weather[0].description}">
    <div class="temp">${Math.round(main.temp)}°C</div>
    <div class="desc">${weather[0].main} – ${weather[0].description}</div>
    <div class="details">
      💧 Humidity: ${main.humidity}%<br>
      🌬️ Wind: ${wind.speed} m/s
    </div>
  `;
}

// Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

// Detect location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    () => {
      weatherContainer.innerHTML = `<p>📍 Please allow location access or search manually.</p>`;
    }
  );
} else {
  weatherContainer.innerHTML = `<p>⚠️ Geolocation not supported.</p>`;
}
