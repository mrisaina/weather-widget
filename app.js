let city = document.querySelector(".city-name");
let date = document.querySelector(".date");
let temp = document.querySelector(".temp");

let icon = document.querySelector(".icon");

let pressure = document.querySelector(".pressure");
let description = document.querySelector(".description");
let humidity = document.querySelector(".humidity");
let speed = document.querySelector(".speed");
let deg = document.querySelector(".deg");

let dropdown = document.querySelectorAll(".dropdown-list");
let options = document.querySelectorAll("option");

let arr = [];
options.forEach((el) => arr.push(el.value));

let currentDate = (index) => {
  const tz = [
    "Europe/Kyiv",
    "Europe/London",
    "Europe/Paris",
    "America/Toronto",
    "Australia/Sydney",
  ];
  return new Date().toLocaleString("en-US", {
    timeZone: tz[index],
    dateStyle: "full",
    timeStyle: "medium",
  });
};

let switchLoader = () => {
  document.querySelector(".loader-cont").classList.toggle("show");
  document.querySelector(".weather").classList.toggle("hide");
};

const displayWeather = (location, i) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location.value.toUpperCase()}&units=metric&APPID=5d066958a60d315387d9492393935c19`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = data.name;

      const dateLong = currentDate(i).split(",")[0];
      const weekdayLong = currentDate(i).split("at")[0].split(",").slice(1);
      const timeLong = currentDate(i).split("at")[1];

      date.innerHTML = `
      <div>${dateLong}</div>
      <div>${weekdayLong}</div>
      <div>${timeLong}</div>
      `;

      temp.innerHTML = `
      <div class="big-temp">${data.main.temp.toFixed(1) + "&#8451;"}</div>
      <div>Feels like: ${data.main.feels_like.toFixed(1) + "&#8451;"}</div>
      `;

      icon.innerHTML = `
      <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
      `;
      description.innerHTML = `
      <div>Description: ${data.weather[0].description}</div>
      `;

      pressure.innerHTML = `
      <div>Pressure: ${data.main.pressure}</div>
      `;
      humidity.innerHTML = `
      <div>Humidity: ${data.main.humidity}</div>
      `;
      speed.innerHTML = `
      <div>Wind Speed: ${data.wind.speed}</div>
      `;
      deg.innerHTML = `
      <div>Wind Deg: ${data.wind.deg}</div>
      `;
    });
};

displayWeather(dropdown[0], 0);

dropdown.forEach((el) => {
  el.addEventListener("change", (e) => {
    let target = e.target;

    setTimeout(() => switchLoader(), 1500);
    switchLoader();
    setTimeout(() => displayWeather(target, arr.indexOf(target.value)), 500);
  });
});
