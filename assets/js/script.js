const API_KEY = "02a370540614195f83ab60c2c869ff48";
const url = "https://api.openweathermap.org/data/2.5/";

const $cityInput = $("#cityInput");
const $buttonSubmit = $("#buttonSubmit");

const imgNow = $("#imgNow");
const cityNow = $("#cityNow");
const tempNow = $("#tempNow");
const windNow = $("#windNow");
const humidityNow = $("#humidityNow");
const card0 = $("#card1");
const card1 = $("#card2");
const card2 = $("#card3");
const card3 = $("#card4");
const card4 = $("#card5");
const searchButHist = $("#oldsearch");

let buttonHist = JSON.parse(localStorage.getItem("searchHist"));

const getWeather = function (cityInput) {
  fetch(`${url}weather?q=${cityInput}&units=imperial&APPID=${API_KEY}`)
    .then((response) => response.json())
    .then(function (data) {
      currentDate = dayjs(data.dt * 1000).format("M/D/YYYY");
      cityNow.text(`${data.name}, ${data.sys.country} (${currentDate})`);

      const $img = document.createElement("img");
      $img.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      $img.setAttribute("style", "width: 5%");
      cityNow.append($img);

      tempNow.text(`Temp: ${data.main.temp} °F`);
      windNow.text(`Wind: ${data.wind.speed} MPH`);
      humidityNow.text(`Humidity: ${data.main.humidity} %`);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      fetch(
        `${url}forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`
      )
        .then((response) => response.json())
        .then(function (forecast) {
          fiveDay = [];
          
          forecast.list.forEach(function (item, index) {
            // need to see if there is a way to always do noon, currenly grabbing current time
            if ((index + 1) % 8 === 0) {
              fiveDay.push(item);
            }
          });


          for (i = 0; i < fiveDay.length; i++) {
            const cardFuture = eval("card" + i);
            cardFuture.text(dayjs(fiveDay[i].dt * 1000).format(
              "M/D/YYYY")
            );
            const cardData = $("<ul>");
            const cardList = $("<li>");
            const imgCard = $("<img>");
            imgCard.attr(
              "src",
              `https://openweathermap.org/img/wn/${fiveDay[i].weather[0].icon}@2x.png`
            );


            imgCard.attr("style", "width: 30%");
            cardFuture.append(cardData);
            cardData.append(cardList);
            cardList.append(imgCard);
            const tempFuture = $("<li>");
            const windFuture = $("<li>");
            const humidityFuture = $("<li>");
            tempFuture.text(`Temp: ${fiveDay[i].main.temp} °F`)
            windFuture.text(`Wind: ${fiveDay[i].wind.speed} MPH`)
            humidityFuture.text(`Humidity: ${fiveDay[i].main.humidity} %`);
            cardList.append(tempFuture);
            cardList.append(windFuture);
            cardList.append(humidityFuture);
          }
        });

      buttonHist.unshift($cityInput.val());
      localStorage.setItem("searchHist", JSON.stringify(buttonHist));
      $cityInput.val('')
      renderSearch();
    });
};

$buttonSubmit.on("click", function () {
  getWeather($cityInput.val());
});

const renderSearch = function () {

  searchButHist.empty();

  if (buttonHist !== null) {
    buttonHist.forEach(function (item) {
      const oldSearch = $("<button>");
      oldSearch.attr("id", "generated-button");
      oldSearch.attr('value',item)
      oldSearch.text(item)

      searchButHist.append(oldSearch);
    });
  } else {
    buttonHist = [];
  }
};
renderSearch();


searchButHist.on("click", "#generated-button", function (event) {
  $cityInput.val(event.target.value);
  getWeather($cityInput.val());
});
