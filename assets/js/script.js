const API_KEY = '02a370540614195f83ab60c2c869ff48';
const url = 'https://api.openweathermap.org/data/2.5/';


const $cityInput = document.getElementById('cityInput');
const $buttonSubmit = document.getElementById('buttonSubmit');

const imgNow = document.getElementById('imgNow');
const cityNow = document.getElementById('cityNow');
const tempNow = document.getElementById('tempNow');
const windNow = document.getElementById('windNow');
const humidityNow = document.getElementById('humidityNow');
const card0 = document.getElementById('card1');
const card1 = document.getElementById('card2');
const card2 = document.getElementById('card3');
const card3 = document.getElementById('card4');
const card4 = document.getElementById('card5');

$buttonSubmit.addEventListener('click', function () {

    const cityInput = $cityInput.value;
    fetch(`${url}weather?q=${cityInput}&units=imperial&APPID=${API_KEY}`)
      .then(response => response.json())
      .then(function (data) {
        currentDate = dayjs(data.dt*1000).format('M/D/YYYY');
        cityNow.textContent = `${data.name}, ${data.sys.country} (${currentDate})`;

        const $img = document.createElement('img');
        $img.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        $img.setAttribute('style', 'width: 5%') ;
        cityNow.append($img);

        tempNow.textContent = `Temp: ${data.main.temp} °F`;
        windNow.textContent = `Wind: ${data.wind.speed} MPH`;
        humidityNow.textContent = `Humidity: ${data.main.humidity} %`;   

        const lat = data.coord.lat;  
        const lon = data.coord.lon;

        fetch(`${url}forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`)
          .then(response => response.json())
          .then(function (forecast) {

            fiveDay = [];

            forecast.list.forEach(function(item, index) {
        
                if ((index + 1 )  % 8 === 0) {
                    fiveDay.push(item)
                    console.log(index)
                }
            });

            for (i=0; i< fiveDay.length; i++) {
            const cardFuture =eval('card'+i)
            console.log(cardFuture)
            cardFuture.textContent = dayjs(fiveDay[i].dt*1000).format('M/D/YYYY')
            const cardData = document.createElement('ul');
            const cardList = document.createElement('li');           
            const imgCard = document.createElement('img');
            imgCard.setAttribute('src', `https://openweathermap.org/img/wn/${fiveDay[i].weather[0].icon}@2x.png`);
            imgCard.setAttribute('style', 'width: 30%') ;
            cardFuture.appendChild(cardData);
            cardData.appendChild(cardList);
            cardList.append(imgCard);
            const tempFuture = document.createElement('li');
            const windFuture = document.createElement('li');
            const humidityFuture = document.createElement('li');
            tempFuture.textContent = `Temp: ${fiveDay[i].main.temp} °F`;
            windFuture.textContent = `Wind: ${fiveDay[i].wind.speed} MPH`;
            humidityFuture.textContent = `Humidity: ${fiveDay[i].main.humidity} %`;   
            cardList.append(tempFuture);
            cardList.append(windFuture);
            cardList.append(humidityFuture);
            }



      })})
  });




// const $container = document.querySelector('.container');


// $searchBtn.addEventListener('click', function () {

//   const giphyInput = $giphyInput.value;
//   fetch(`${url}?api_key=${API_KEY}&q=${giphyInput}&rating=g`)
//     .then(response => response.json())
//     .then(function (data) {
//       console.log(data.data[0]);
//       // console.log(data.data[0].images.original.url);

//       for (let i = 0; i < data.data.length; i++) {
//         const $img = document.createElement('img');
//         $img.setAttribute('src', data.data[i].images.original.url);
//         $container.appendChild($img);
//       }
//     });
// });