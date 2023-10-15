// const form = document.getElementById('weatherForm');
// const cityInput = document.querySelector('.city-input');
// const currentWeatherDetails = document.querySelector('.current-weather .details'); // Corrected variable name
// const fiveDayForecast = document.querySelector('.five-day-cards'); // Corrected class name

// const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// // Event listener for form
// form.addEventListener('submit', (event) => { // Corrected event listener
//     event.preventDefault();

//     const city = cityInput.value;

//     fetchWeatherData(city); // Corrected function name
// })

// // Function to fetch weather data
// function fetchWeatherData(city) {
//     const queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

//     fetch(queryURL)
//     .then(function (response) {
//         return response.json(); 
//     })
//     .then(function (data) {
//         updateWeatherData(data); // Corrected function name
//     })
//     .catch(function (error) {
//         console.error(error); 
//     });
// }

// // Function to update content on page for current weather
// function updateWeatherData(data) {
//     const cityName = data.name;
//     const temperature = data.main.temp;
//     const windSpeed = data.wind.speed;
//     const humidity = data.main.humidity;

//     currentWeatherDetails.innerHTML = `
//     <h2>${cityName}</h2>
//     <h5>Temperature: ${temperature}°C</h5>
//     <h5>Wind: ${windSpeed} m/s</h5>
//     <h5>Humidity: ${humidity}%</h5>`;
// }

// // Function to fetch 5-day forecast data
// function fetchFiveDayForecast(city) {
//     const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey;

//     fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         displayFiveDayForecast(data); 
//     })
//     .catch(function (error) {
//         console.log(error); 
//     });
// }

// // Function to update content on page for 5-day forecast
// function displayFiveDayForecast(data) {
//     const forecastList = data.list;

//     fiveDayForecast.innerHTML = '';

//     for (let i = 0; i < forecastList.length; i++) {
//         const forecast = forecastList[i];

//         const temperature = forecast.main.temp;
//         const windSpeed = forecast.wind.speed;
//         const humidity = forecast.main.humidity;

//         const card = document.createElement('li');
//         card.classList.add('card');
//         card.innerHTML = `
//         <h5>Temperature: ${temperature}°C</h5>
//         <h5>Wind: ${windSpeed} m/s</h5>
//         <h5>Humidity: ${humidity}%</h5>`;

//         fiveDayForecast.appendChild(card); 
//     }
// }

// fetchFiveDayForecast('Tokyo');
