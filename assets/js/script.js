const form = document.getElementById('weatherForm');
const cityInput = document.querySelector('.city-input');
const currentWeatherDetails = document.querySelector('.current-weather .details');
const fiveDayForecast = document.querySelector('.fiveDayForecast');

const APIKey = "1f7ee33dc86217d48db8099bae79dad7";

// Function to get Weather Icons class based on condition code
function getWeatherIconClass(conditionCode, isDay) {
    const baseURL = 'https://openweathermap.org/img/wn/';
    let iconCode;

    // Switch statement to map condition codes to icon codes
    switch (conditionCode) {
        // Group 2xx: Thunderstorm
        case '11d':
            iconCode = '11d';
            break;
        // Group 3xx: Drizzle
        case '09d':
            iconCode = '09d';
            break;
        // Group 5xx: Rain
        case '10d':
            iconCode = '10d';
            break;
        // Group 6xx: Snow
        case '13d':
            iconCode = '13d';
            break;
        // Group 7xx: Atmosphere
        case '50d':
            iconCode = '50d';
            break;
        // Group 800: Clear
        case '01d':
            iconCode = '01' + (isDay ? 'd' : 'n');
            break;
        // Group 80x: Clouds
        case '02d':
        case '03d':
        case '04d':
            iconCode = conditionCode;
            break;
        default:
            iconCode = '01d'; // Default to clear sky during the day
            break;
    }

    // Return the full icon URL
    return baseURL + iconCode + '.png';
}

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
        displayFiveDayForecast(data);
    })
    .catch(function (error) {
        console.error(error); 
    });
}

// function to update content on page for current weather
function updateWeatherData(data) {
    
    if (data.main && data.weather && data.weather.length > 0) {
        const temperatureKelvin = data.main.temp;
        const temperatureFahrenheit = kelvinToFahrenheit(temperatureKelvin);
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const isDay = true;
        const iconURL = getWeatherIconClass(data.weather[0].icon, isDay);

        currentWeatherDetails.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${iconURL}" alt="Weather Icon">
            <h5>Temperature: ${temperatureFahrenheit}°F</h5>
            <h5>Wind: ${windSpeed} m/s</h5>
            <h5>Humidity: ${humidity}%</h5>`;
    } else {
        console.error('Main data not present in API response:', data);
    }
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

    const cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('five-day-cards');

    if (forecastList && forecastList.length > 0) {
        const forecastSlice = forecastList.slice(1);

        for (let i = 0; i < forecastSlice.length; i +=8) { 
            const forecast = forecastSlice[i];

            const isDay = true;
            const iconClass = getWeatherIconClass(forecast.weather[0].icon, isDay);
    
            // Timestamps 102-106
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
            <p>Date: ${formattedDate}</p>
            <i class="${iconClass}"></i>
            <p>Temperature: ${temperatureFahrenheit}°F</p>
            <p>Wind: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
            <i class="${iconClass}"></i>`;
    
            cardsContainer.appendChild(card);
    }
    } else {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No forecast data available';
        fiveDayForecast.appendChild(noDataMessage);
    }

    fiveDayForecast.appendChild(cardsContainer);
}

// Search history starts here
// Function to fetch current weather and 5-day forecast
function fetchWeatherAndForecast(city) {
    fetchWeatherContent(city);
    fetchFiveDayForecast(city);
}

// Function to display the search history
function displaySearchHistory() {
    const searchHistoryList = document.getElementById('searchHistoryList');
    searchHistoryList.innerHTML = '';

    // Retrieves search history from local storage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Creates list items for each city in the search history
    searchHistory.forEach((city) => {
        const listItem = document.createElement('li'); 
        listItem.textContent = city; 
        listItem.addEventListener('click', () => {
            // Perform new search for that city when past search clicked. 
            fetchWeatherAndForecast(city);
        });
        searchHistoryList.appendChild(listItem);
        });
}

// Event listener for search history items
searchHistoryList.addEventListener('click', (event) => {
    const clickedCity = event.target.textContent;
    fiveDayForecast.style.display = 'block';
    fetchWeatherAndForecast(clickedCity);
});

// call function to display search history on page load
displaySearchHistory();

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

    if (city) {
        fiveDayForecast.style.display = 'block';
        fetchWeatherAndForecast(city);
        addToSearchHistory(city);
        fetchFiveDayForecast(city);

        cityInput.value = '';
    } 
});

// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

// Few issues to fix: 
// 2. Need to add weather icons as well. 
// 3. Need to syle it using CSS. 