const form = document.getElementById('weatherForm');
const cityInput = document.querySelector('.city-input');
const currentWeather = document.querySelector('.current-weather .details');
const fiveDayForecast = document.querySelector('.five-day-cards');

const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// Event listener for form
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value;

    fetchWeatherData(city);
})

// function to fetch weather data
function fetchWeatherData(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

    fetch(queryURL)
    .then(function (response) {
        return response.json(); 
    })
    .then(function (data) {
        updateWeatherContent(data);
    })
    .catch(function (error) {
        console.error(error); 
    });
}

// function to update content on page for current weather
function updateWeatherContent(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    currentWeatherDetails.innerHTML = `
    <h2>${cityName}</h2>
    <h5>Temperature: ${temperature}°C</h5>
    <h5>Wind: ${windSpeed} m/s</h5>
    <h5>Humidity: ${humidity}%</h5>`;
}

// Function to fetch 5-day forecast data
function fetchFiveDayForecast(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

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

    for (let i = 0; i < forecastList.length; i ++) {
        const forecast = forecastList[i];

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