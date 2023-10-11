var APIKey = "1f7ee33dc86217d48db8099bae79dad7";

var city; 

// API Call
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)







// Guidance: https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys