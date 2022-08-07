const currentWeatherItemsEl = document.querySelector(".current__others");
const timezone = document.querySelector(".time__zone");
const countryEl = document.querySelector(".country");

export const renderCurrentWeatherItems = function (data) {
  const { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = `${data.lat}N + ${data.lon}E`;
  currentWeatherItemsEl.innerHTML = `
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
              <div>${wind_speed}</div>
            </div>
            <div class="weather__item">
              <div>Sunrise</div>
              <div>${window.moment(sunrise * 1000).format("HH:mm")}</div>
            </div>
            <div class="weather__item">
              <div>Sunset</div>
              <div>${window.moment(sunset * 1000).format("HH:mm")}</div>
            </div>
  `;
};
