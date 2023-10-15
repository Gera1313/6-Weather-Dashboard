const form = document.getElementById('weatherForm');
const cityInput = document.querySelector('.city-input');
const currentWeatherDetails = document.querySelector('.current-weather .details');
const fiveDayForecast = document.querySelector('.fiveDayForecast');

const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// Event listener for form
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value;

    fetchWeatherContent(city);
    fetchFiveDayForecast(city); // added this
})

// function to fetch weather data
function fetchWeatherContent(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

    fetch(queryURL)
    .then(function (response) {
        return response.json(); 
    })
    .then(function (data) {
        updateWeatherData(data);
    })
    .catch(function (error) {
        console.error(error); 
    });
}

// function to update content on page for current weather
function updateWeatherData(data) {
    const cityName = data.name;
    const temperatureKelvin = data.main.temp;
    const temperatureFahrenheit = kelvinToFahrenheit(temperatureKelvin);
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    // Formula to convert from Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

    currentWeatherDetails.innerHTML = `
    <h2>${cityName}</h2>
    <h5>Temperature: ${temperatureFahrenheit}°F</h5>
    <h5>Wind: ${windSpeed} m/s</h5>
    <h5>Humidity: ${humidity}%</h5>`;
}

// Function to fetch 5-day forecast data
function fetchFiveDayForecast(city) {
    const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=` + city + '&appid=' + APIKey;

    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayFiveDayForecast(data); 
    })
    .catch(function (error) {
        console.log(error); 
    });
}

// function to update content on page for 5-day forecast
function displayFiveDayForecast(data) {
    const forecastList = data.list;

    fiveDayForecast.innerHTML = '';

    for (let i = 0; i < forecastList.length; i += 8) { // or i +=8 ?
        const forecast = forecastList[i];

        const date = new Date(forecast.dt * 1000); // not sure if this
        const temperature = forecast.main.temp;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;

        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `
        <h5>Temperature: ${temperature}°C</h5>
        <h5>Wind: ${windSpeed} m/s</h5>
        <h5>Humidity: ${humidity}%</h5>`;

        fiveDayForecast.appendChild(card); 
    }
}

fetchFiveDayForecast('Tokyo');




// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys