import * as Config from "./config.js";

const timeEl = document.querySelector(".current__time");
const dateEl = document.querySelector(".current__date");

export const renderTimeAndDate = function (time) {
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const day = time.getDay();
  const month = time.getMonth();
  const date = time.getDate();

  timeEl.innerHTML = `${hours}:${minutes}`;
  dateEl.innerHTML = `${Config.dayNames[day]}, ${Config.monthNames[month]} ${date}`;
};
