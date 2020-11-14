const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const summary = document.querySelector(".summary");
const temp = document.querySelector(".temp");
const dailyTempContainer = document.getElementById("daily_temp_container");
const time = document.querySelector(".time");
const cityName = document.getElementById("city__name");
const countryName = document.getElementById("country__name");
const dayNameElmt = document.getElementById("day_name");
const timeClock = document.getElementById("time_clock");
const time_PM_AM = document.getElementById("time_PM_AM");
const precipProbability = document.getElementById("precip_probability");
const humidity = document.getElementById("humidity");
const weatherIconImg = document.getElementById("weather_icon_img");
const windSpeed = document.getElementById("wind_speed");
const searchResult = document.getElementById("search_result");

let placeName;
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
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

const darkSkyIcons = [
  "clear-day",
  "clear-night",
  "partly-cloudy-day",
  "partly-cloudy-night",
  "cloudy",
  "rain",
  "sleet",
  "snow",
  "wind",
  "fog",
];

if (!localStorage.getItem("weatherApp")) {
  document.addEventListener("DOMContentLoaded", (e) => {
    localStorage.setItem("weatherApp", "gaza");
    fetchWeather("gaza");
  });
} else if (localStorage.getItem("weatherApp")) {
  placeName = localStorage.getItem("weatherApp");
  fetchWeather(placeName);
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  placeName = search.value;
  localStorage.setItem("weatherApp", placeName);
  console.log(placeName);

  fetchWeather(placeName);
});

function fetchWeather(placeName) {
  fetch(`/weather?address=${placeName}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        temp.classList.add("temp-error");
        temp.textContent = data.error;
      } else {
        temp.textContent = Math.round(data.temperature);
        summary.textContent = data.summary;
        // maxTemp.textContent = Math.round(data.maxTemp);
        // minTemp.textContent = Math.round(data.minTemp);
        countryName.textContent = data.countryName;
        cityName.textContent = data.placeName;
        precipProbability.textContent = data.precipProbability * 100 + "%";
        humidity.textContent = Math.round(data.humidity * 100) + "%";

        weatherIconImg.setAttribute("src", `img/weathericons/${data.icon}.png`);
        weatherIconImg.setAttribute("alt", data.icon);

        windSpeed.textContent = data.windSpeed;

        dayNameElmt.textContent = `${
          days[new Date(data.timeNow * 1000).getDay()]
        }`;
        timeClock.textContent = `${new Date(
          +(data.timeNow + "000")
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ${
          new Date(+(data.timeNow + "000")).getHours() >= 12 ? "PM" : "AM"
        }`;

        // let loading = false;
        // console.log(typeof data.daily);
        // if (!data.daily) {
        //   loading = true;
        //   const loadingImg = document.createElement("img");
        //   loadingImg.setAttribute("src", `img/loadingimg/loading.webp`);
        //   dailyTempContainer.appendChild(loadingImg);
        // }
        renderDailyWeather(data.daily.splice(0, 6));
      }
    });
  });
}

// Render Daily Temp To DOM
function renderDailyWeather(dailyWeatherArray) {
  while (dailyTempContainer.hasChildNodes()) {
    dailyTempContainer.removeChild(dailyTempContainer.lastChild);
  }
  dailyWeatherArray.forEach((item) => {
    // Div Element Container For All Daily Temp Element
    const dayContainerDiv = document.createElement("div");
    dayContainerDiv.setAttribute(
      "class",
      "col-2 px-0 justify-content-conter text-center"
    );

    // Div Element To Day Name Text
    const dayNameDiv = document.createElement("div");
    dayNameDiv.setAttribute("class", "daily-day-name");
    const dayTextP = document.createElement("p");
    dayTextP.setAttribute("class", "mb-1");
    dayTextP.textContent = days[new Date(+(item.time + "000")).getDay()].slice(
      0,
      3
    );
    dayNameDiv.appendChild(dayTextP);

    // Div Element For Icon Image
    const dayIconDiv = document.createElement("div");
    dayIconDiv.setAttribute("class", "");
    const dayIconImg = document.createElement("img");
    dayIconImg.setAttribute("src", `img/weathericons/${item.icon}.png`);
    dayIconDiv.appendChild(dayIconImg);

    // Div Element To Max And Min In Each Day
    const dayTempDiv = document.createElement("div");
    dayTempDiv.setAttribute("class", "pt-2");
    const dayMaxTemp = document.createElement("span");
    const dayMinTemp = document.createElement("span");

    const supDegSympoleMin = document.createElement("sup");
    supDegSympoleMin.innerHTML = "&deg;";
    const supDegSympoleMax = document.createElement("sup");
    supDegSympoleMax.innerHTML = "&deg;";

    dayMaxTemp.setAttribute("class", "temp pr-2");
    dayMaxTemp.setAttribute("id", "max-temp");
    dayMaxTemp.textContent = Math.round(item.temperatureMax);
    dayMaxTemp.appendChild(supDegSympoleMax);

    dayMinTemp.setAttribute("class", "temp");
    dayMinTemp.setAttribute("id", "min-temp");
    dayMinTemp.textContent = Math.round(item.temperatureMin);
    dayMinTemp.appendChild(supDegSympoleMin);
    dayTempDiv.append(dayMaxTemp, dayMinTemp);

    // Append All Div Element To Container
    dayContainerDiv.append(dayNameDiv, dayIconDiv, dayTempDiv);

    dailyTempContainer.appendChild(dayContainerDiv);
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  let resultCards;
  search.addEventListener("input", (e) => {
    e.preventDefault();
    fetch(`/weather?address=${e.target.value}`).then((res) => {
      res.json().then((data) => {
        if (data.err) {
          console.log(data.error);
        } else {
          searchResult.classList.add("block");

          if (e.target.value === "") {
            searchResult.classList.remove("block");
          }

          renderResultSearchCard(data.features);
          resultCards = document.querySelectorAll(".result-card");

          resultCards.forEach((item) => {
            item.addEventListener("click", function (e) {
              fetchWeather(this.dataset.placeName);
              search.value = "";
              if (search.value === "") {
                searchResult.classList.remove("block");
              }
            });
          });
        }
      });
    });
  });

  const renderResultSearchCard = (searchResultData) => {
    if (!searchResultData) {
      return;
    }
    searchResult.innerHTML = "";
    searchResultData.forEach((item) => {
      searchResult.innerHTML += `<div class="col-12 result-card p-1 px-3" data-place-name="${
        item.place_name.split(", ")[0]
      }" data-lat="${item.center[1]}" data-long="${item.center[0]}" data-id="${
        item.id
      }">
      <div class="result-card__header py-1">
        <span class="result-place-name">${item.place_name}</span>
      </div>
      <div class="result-card--details py-1">
        <i class="fas fa-map-marker-alt"></i>
        Lat: <span class="result-card--details__lat">${item.center[1].toFixed(
          3
        )}</span>
        Long: <span class="result-card--details__long">${item.center[0].toFixed(
          3
        )}</span>
      </div>
    </div>`;
    });
  };
});
