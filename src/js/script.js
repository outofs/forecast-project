import * as Config from "./config.js";
import { renderTimeAndDate } from "./renderTimAndDate.js";
import { renderCurrentWeatherItems } from "./renderCurrentWeatherItems.js";
import { renderOtherDayForecast } from "./renderOtherDayForecast.js";
import { renderTitle } from "./renderTitle.js";

const searchButton = document.querySelector(".search__button");
const searchBar = document.querySelector(".search__bar");

const renderData = function (url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderCurrentWeatherItems(data);
      renderOtherDayForecast(data);
    });
};

const renderCityName = function (url, renderTitle) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderTitle(data[0]));
};

const searchingFunction = function () {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=5&appid=${Config.KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const { lat, lon } = data[0];
      renderTitle(data[0]);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${Config.KEY}`;
      renderData(url);
    });
};

const getWeatherData = function () {
  navigator.geolocation.getCurrentPosition((success) => {
    const { latitude, longitude } = success.coords;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${Config.KEY}`;
    const locationUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${Config.KEY2}`;
    renderCityName(locationUrl, renderTitle);
    renderData(weatherUrl);
  });
};

setInterval(() => {
  const time = new Date();
  renderTimeAndDate(time);
}, 1000);

getWeatherData();

searchButton.addEventListener("click", function (e) {
  searchingFunction();
});

// document.addEventListener("keydown", function (e) {
//   e.preventDefault();
//   if (e.key === "Enter") {
//     searchingFunction();
//   }
// });
