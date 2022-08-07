const weatherForecastEl = document.querySelector(".weather__forecast");
const currentTempEl = document.querySelector(".today");

export const renderOtherDayForecast = function (data) {
  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          alt="weather icon"
          class="w__icon"
        />
        <div class="other">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
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

  weatherForecastEl.innerHTML = otherDayForecast;
};
