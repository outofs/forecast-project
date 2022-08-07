const title = document.querySelector(".title");

export const renderTitle = function (data) {
  title.innerHTML = `Weather in ${data.name}, ${data.country}`;
};
