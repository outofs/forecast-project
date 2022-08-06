const timeEl = document.querySelector(".current__time");
const dateEl = document.querySelector(".current__date");
const currentWeatherItrmsEl = document.querySelector(".current__others");
const timezone = document.querySelector(".time__zone");
const countryEl = document.querySelector(".country");
const weatherForecastEl = document.querySelector(".weather__forecast");
const currentTempEl = document.querySelector("today");

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunay",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const apiKey = "04e734ee28bd68f1eb6b913bd39bff07";

setInterval(() => {
  const time = new Date();
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const day = time.getDay() - 1;
  const month = time.getMonth();
  const date = time.getDate();
  console.log(date);

  timeEl.innerHTML = `${hours} : ${minutes}`;
  dateEl.innerHTML = `${dayNames[day]}, ${monthNames[month]} ${date}`;
}, 1000);

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    const { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

const showWeatherData = function (data) {
  const { humidity, pressure, sunrise, sunset, windSpeed } = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = `${data.lat}N + ${day.lon}E`;
  currentWeatherItrmsEl.innerHTML = `
  
            <div class="weather__item">
              <div>Humidity</div>
              <div>${humidity}%</div>
            </div>
            <div class="weather__item">
              <div>Pressure</div>
              <div>${pressure}</div>
            </div>
            <div class="weather__item">
              <div>Wind Speed</div>
              <div>${windSpeed}</div>
            </div>
            <div class="weather__item">
              <div>Sunrise</div>
              <div>${window.moment(sunrise * 1000).format("HH:mm")}</div>
            </div>
            <div class="weather__item">
              <div>Sunset</div>
              <div>${window.moment(sunset * 1000).format("HH:mm")}</div>
            </div>
          </div>
  `;

  let otherDayForecast = "";
  data.daily.forEach((day, index) => {
    if (index === 0) {
      currentTempEl.innerHTML = `
        <div class="today" id="current__temp">
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          alt="weather icon"
          class="w__icon"
        />
        <div class="other">
          <div class="day">Monday</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
      </div>
        `;
    } else {
      otherDayForecast += `
        <div class="weather__forecast__item">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            alt="weather icon"
            class="w__icon"
          />
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
    `;
    }
  });

  weatherForecastEl.insertAdjacentHTML("afterbegin", otherDayForecast);
};

getWeatherData();
