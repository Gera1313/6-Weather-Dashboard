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

    fetchWeatherData(city);
})

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






// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys