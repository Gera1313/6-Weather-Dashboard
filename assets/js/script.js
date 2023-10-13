const form = document.getElementById('weatherForm');
const cityInput = document.querySelector('.city-input');
const currentWeather = document.querySelector('.current-weather .details');
const fiveDayForecast = document.querySelector('.five-day-cards');

const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// const city; 

// API Call
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// fetch(queryURL) {
//     .then(function (response) {
//         if (response.ok) {
//             return response.json();
//         }
//     })
// }

// Event listener for form
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value;

    fetchfiveDayForecast(city);
})

// function to fetch weather data
function fetchWeatherData(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey';

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

// function to update content on page
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

fetchFiveDayForecast('Tokyo');




// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys