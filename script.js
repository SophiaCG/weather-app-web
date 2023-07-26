const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=`;

// Make a GET request to the API
fetch(apiUrl)
  .then((response) => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response as JSON
    return response.json();
  })
  .then((data) => {
    processWeatherData(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  });

function processWeatherData(data) {
  document.getElementById("temp").textContent = `${data.main.temp}º F`;
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("weekday-time").textContent = formatWeekdayTime(
    data.dt
  );
  document.getElementById("day-month-year").textContent = formatDayMonthYear(
    data.dt
  );
  document.getElementById("todays-forecast").textContent =
    capitalizeFirstLetter(data.weather[0].description);

  document.getElementById("high-temp").textContent = `${data.main.temp_max}º F`;
  document.getElementById("low-temp").textContent = `${data.main.temp_min}º F`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;
  document.getElementById("clouds").textContent = `${data.clouds.all}%`;
  document.getElementById("rain").textContent = `${data.rain["1h"]} in.`;
  document.getElementById("sunrise").textContent = formatTime(data.sys.sunrise);
  document.getElementById("sunset").textContent = formatTime(data.sys.sunset);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatWeekdayTime(date) {
  const newDate = new Date(date * 1000);
  const dayAndTime = newDate.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });

  return dayAndTime;
}

function formatDayMonthYear(date) {
  const newDate = new Date(date * 1000);
  const dayMonthYear = newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dayMonthYear;
}

function formatTime(date) {
  const newDate = new Date(date * 1000);
  const dayMonthYear = newDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return dayMonthYear;
}

var btn = document.getElementById("btn");

function leftClick() {
  btn.style.left = "0";
}

function rightClick() {
  btn.style.left = "50px";
}
