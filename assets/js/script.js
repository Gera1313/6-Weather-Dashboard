const form = document.getElementById('weatherForm');
const cityInput = document.querySelector('.city-input');
const currentWeatherDetails = document.querySelector('.current-weather .details');
const fiveDayForecast = document.querySelector('.fiveDayForecast');

const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// Event listener for form
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = cityInput.value;

    // Makes the 5-Day forecast section visible
    fiveDayForecast.style.display = 'block';

    fetchWeatherContent(city);
    fetchFiveDayForecast(city); // added this
})

// Formula to convert from Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

// Function to display the current date
function displayCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    const currentDate = new Date();
  
    // Format the date (you can adjust the format as needed)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
  
    currentDateElement.textContent = formattedDate;
  }
  
  // Call the function to display the current date
  displayCurrentDate();

// function to fetch current weather data
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

    currentWeatherDetails.innerHTML = `
    <h2>${cityName}</h2>
    <h5>Temperature: ${temperatureFahrenheit}°F</h5>
    <h5>Wind: ${windSpeed} m/s</h5>
    <h5>Humidity: ${humidity}%</h5>`;
}

// Function to fetch 5-day forecast data
function fetchFiveDayForecast(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey;

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

    function convertKelvinToFahrenheit(kelvin) {
        return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); 
    }

    for (let i = 0; i < forecastList.length; i +=8) {
        const forecast = forecastList[i];

        // Timestamps
        const dateTimestamp = forecast.dt * 1000;
        const forecastDate = new Date(dateTimestamp);

        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = forecastDate.toLocaleDateString(undefined, options);

        const temperatureKelvin = forecast.main.temp;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;

        const temperatureFahrenheit = convertKelvinToFahrenheit(temperatureKelvin);

        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `
        <h5>Temperature: ${temperatureFahrenheit}°F</h5>
        <h5>Wind: ${windSpeed} m/s</h5>
        <h5>Humidity: ${humidity}%</h5>`;

        fiveDayForecast.appendChild(card); 
    }
}

fetchFiveDayForecast('Tokyo');

// Search history starts here, using arrow functions here for added practice:

// Function to fetch current weather and 5-day forecast
function fetchWeatherAndForecast(city) {
    fetchWeatherContent(city);
    fetchFiveDayForecast(city);
}

// Function to display the search history
function displaySearchHistory(history) {
    const searchHistoryList = document.getElementById('searchHistoryList');
    searchHistoryList.innerHTML = '';

    // Creates list items for each city in the search history
    history.forEach((city) => {
        const listItem = document.createElement('li'); 
        listItem.textContent = city; 
        listItem.addEventListener('click', () => {
            // Perform new search for that city when past search clicked. 
            fetchWeatherAndForecast(city);
        });
        searchHistoryList.appendChild(listItem);
        });
}

// Function to save a city to the search history
function addToSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // If 'searchHistory' is null in local storage, initialize it as an array. This should get rid of the null error if it works. 
    if (!searchHistory) {
        searchHistory = [];
      }

    // Check here if city is already on list
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    displaySearchHistory(searchHistory);
}

// event listener to save the search to the history
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value;
    fiveDayForecast.style.display = 'block';
    fetchWeatherAndForecast(city);
    addToSearchHistory(city);
});

  

// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys