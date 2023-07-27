const apiKey = "";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${apiKey}`;

function callAPI(apiUrl) {
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
      getWeatherImage(data.weather[0].id);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("Fetch error:", error);
    });
}

callAPI(apiUrl);

function processWeatherData(data) {
  document.getElementById("temp").textContent = `${data.main.temp}º`;
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("weekday-time").textContent = formatWeekdayTime(
    data.dt
  );
  document.getElementById("day-month-year").textContent = formatDayMonthYear(
    data.dt
  );
  document.getElementById("todays-forecast").textContent =
    capitalizeFirstLetter(data.weather[0].description);

  document.getElementById("high-temp").textContent = `${data.main.temp_max}º`;
  document.getElementById("low-temp").textContent = `${data.main.temp_min}º`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind-speed").textContent = data.wind.speed;
  document.getElementById("clouds").textContent = `${data.clouds.all}%`;
  document.getElementById("rain").textContent = `${data.rain["1h"]} in.`;
  document.getElementById("sunrise").textContent = formatTime(data.sys.sunrise);
  document.getElementById("sunset").textContent = formatTime(data.sys.sunset);
}

function getWeatherImage(code) {
  const imageElement = document.getElementById("weather-image");
  switch (true) {
    case code >= 200 && code < 300:
      imageElement.setAttribute("src", "images/storm-with-heavy-rain.png");
      break;
    case code >= 200 && code < 300:
      imageElement.setAttribute("src", "images/moderate-rain.png");
      break;
    case code >= 500 && code < 600:
      imageElement.setAttribute("src", "images/heavy-rain.png");
      break;
    case code >= 600 && code < 700:
      imageElement.setAttribute("src", "images/snow.png");
      break;
    case code >= 700 && code < 800:
      imageElement.setAttribute("src", "images/dust.png");
      break;
    case code == 800:
      imageElement.setAttribute("src", "images/sun.png");
      break;
    case code > 800:
      imageElement.setAttribute("src", "images/partly-cloudy-day.png");
      break;
    default:
      imageElement.setAttribute("src", "images/dust.png");
  }
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

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    const searchTerm = event.target.value;
    callAPI(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${apiKey}`
    );
  }
});

var btn = document.getElementById("btn");
const fahrenheitButton = document.getElementById("fahrenheit-label");
const celsiusButton = document.getElementById("celsius-label");
const symbolLabel = document.getElementById("symbol-label");
const unitLabel = document.getElementById("unit-label");

fahrenheitButton.style.color = "black";
celsiusButton.style.color = "white";

function leftClick() {
  fahrenheitButton.style.color = "black";
  celsiusButton.style.color = "white";
  btn.style.left = "0";
  symbolLabel.textContent = "F";
  unitLabel.textContent = "mph";
  callAPI(
    `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=${apiKey}`
  );
  // location.reload();
}

function rightClick() {
  fahrenheitButton.style.color = "white";
  celsiusButton.style.color = "black";
  btn.style.left = "50px";
  symbolLabel.textContent = "C";
  unitLabel.textContent = "k/ph";
  callAPI(
    `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`
  );
  // location.reload();
}

let isSun = true;

function toggleIcon() {
  console.log(isSun);
  const iconElement = document.getElementById("icon-element");
  const circleContainer = document.getElementById("circle-container");

  // Check the current icon class
  if (isSun) {
    // If it's a sun icon, change to the moon icon
    iconElement.classList.remove("fa-sun");
    iconElement.classList.add("fa-moon");
    circleContainer.style.backgroundColor = "#2e2e38";
    iconElement.style.color = "#c8e5e7";
    isSun = !isSun;
  } else {
    // If it's a moon icon, change to the sun icon
    iconElement.classList.remove("fa-moon");
    iconElement.classList.add("fa-sun");
    iconElement.style.color = "#2e2e38";
    circleContainer.style.backgroundColor = "#c8e5e7";
    isSun = !isSun;
  }
}
