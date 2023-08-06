let city = document.getElementById("city");
let currentCity = document.querySelector("#day1 .currentCity");
let dateDay1 = document.querySelector("#day1 .date");
let tempDay1 = document.querySelector("#day1 .temp");
let iconDay1 = document.querySelector("#day1 .icon");
let conditionDay1 = document.querySelector("#day1 .condition");
let dateDay2 = document.querySelector("#day2 .day");
let iconDay2 = document.querySelector("#day2 .icon");
let tempDay2 = document.querySelector("#day2 .temp");
let temp2Day2 = document.querySelector("#day2 .temp2");
let conditionDay2 = document.querySelector("#day2 .condition");
let dateDay3 = document.querySelector("#day3 .day");
let iconDay3 = document.querySelector("#day3 .icon");
let tempDay3 = document.querySelector("#day3 .temp");
let temp2Day3 = document.querySelector("#day3 .temp2");
let conditionDay3 = document.querySelector("#day3 .condition");
let data;
let month = [
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
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getWether(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8c0dff766d194250a3f02856230408&q=${city}&days=3`
  );
  data = await response.json();
  dateDay1.innerHTML = getDate(0);
  currentCity.innerHTML = data.location.name;
  tempDay1.innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} C`;
  conditionDay1.innerHTML = data.forecast.forecastday[0].day.condition.text;
  iconDay1.src = `https:${data.forecast.forecastday[0].day.condition.icon}`;
  dateDay2.innerHTML = getDate(1);
  iconDay2.src = `https:${data.forecast.forecastday[1].day.condition.icon}`;
  tempDay2.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c} C`;
  temp2Day2.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c} C`;
  conditionDay2.innerHTML = data.forecast.forecastday[1].day.condition.text;
  dateDay3.innerHTML = getDate(2);
  iconDay3.src = `https:${data.forecast.forecastday[2].day.condition.icon}`;
  tempDay3.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c} C`;
  temp2Day3.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c} C`;
  conditionDay3.innerHTML = data.forecast.forecastday[2].day.condition.text;
  function getDate(i) {
    let date = new Date(data.forecast.forecastday[i].date);
    return `${date.getDate() + month[date.getMonth()]}       ${
      day[date.getDay()]
    }`;
  }
}
city.addEventListener("keyup", function () {
  getWether(city.value);
});
// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      (async function () {
        let response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        let data = await response.json();
        console.log(data.city);
        getWether(data.city);
      })();
      // Do something with the location data, e.g. display on a map
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}
