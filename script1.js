const cities = ["Shanghai", "Boston", "Kolkata", "Mumbai", "Tokyo"];
const options = {
  method: 'GET',
  headers: {
		'x-rapidapi-key': '264803042amsh90c3934929d988ap1ec955jsn11d1fb18c8f2',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
  }
};

// DOM elements
const cityInput = document.getElementById("city");
const submitBtn = document.getElementById("submit");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind_speed");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// Kelvin → Celsius
const toCelsius = (k) => (k - 273.15).toFixed(1);

// Fetch weather
function getweather(city) {
  cityName.innerText = city;

  fetch(`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`, options)
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data); // 👈 DEBUG

      temp.innerText = toCelsius(data.main.temp) + " °C";
      feels_like.innerText = toCelsius(data.main.feels_like) + " °C";
      humidity.innerText = data.main.humidity + " %";

      wind_speed.innerText = data.wind.speed + " m/s";
      pressure.innerText = data.main.pressure + " hPa";

      sunrise.innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      sunset.innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      // Auto update city name from API
      cityName.innerText = data.name;
    })
    .catch(err => {
      console.error(err);
      alert("City not found / API error");
    });
}

// Search button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getweather(cityInput.value);
});

// Default load
getweather("Kolkata");

function fillTable() {
  cities.forEach(city => {
    fetch(`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`, options)
      .then(res => res.json())
      .then(data => {

        const row = document.querySelector(`tr[data-city="${city}"]`);

        row.querySelector(".temp").innerText =
          toCelsius(data.main.temp) + " °C";

        row.querySelector(".feels").innerText =
          toCelsius(data.main.feels_like) + " °C";

        row.querySelector(".humidity").innerText =
          data.main.humidity + " %";

        row.querySelector(".wind").innerText =
          data.wind.speed + " m/s";

        row.querySelector(".pressure").innerText =
          data.main.pressure + " hPa";

        row.querySelector(".sunrise").innerText =
          new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        row.querySelector(".sunset").innerText =
          new Date(data.sys.sunset * 1000).toLocaleTimeString();

      })
      .catch(err => console.error(city, err));
  });
}

// Call it once page loads
fillTable();
