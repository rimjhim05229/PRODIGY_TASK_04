async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const resultBox = document.getElementById("weatherResult");
  const city = cityInput.value.trim();

  if (!city) {
    resultBox.innerHTML = `<p style="color: #f87171;">Please enter a city name.</p>`;
    return;
  }

  const apiKey = "d37418f655596bc73fdb445cfd6ff49a"; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  resultBox.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const iconCode = data.weather[0].icon;
      resultBox.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" />
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    } else {
      resultBox.innerHTML = `<p style="color: #f87171;">Error: ${data.message}</p>`;
    }
  } catch (error) {
    resultBox.innerHTML = `<p style="color: #f87171;">An unexpected error occurred: ${error.message}</p>`;
  }
}
