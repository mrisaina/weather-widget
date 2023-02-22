const currentDate = new Date().toLocaleString("en-US", {
  timeZone: "Europe/Kyiv",
  dateStyle: "full",
  timeStyle: "medium",
});

let city = document.querySelector(".city-name");
let date = document.querySelector(".date");
let temp = document.querySelector(".temp");

let icon = document.querySelector(".icon");

let pressure = document.querySelector(".pressure");
let description = document.querySelector(".description");
let humidity = document.querySelector(".humidity");
let speed = document.querySelector(".speed");
let deg = document.querySelector(".deg");

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=KYIV&units=metric&APPID=5d066958a60d315387d9492393935c19"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    city.innerHTML = data.name;

    const dateLong = currentDate.split(",")[0];
    const weekdayLong = currentDate.split("at")[0].split(",").slice(1);
    const timeLong = currentDate.split("at")[1];

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
