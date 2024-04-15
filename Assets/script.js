const apiKey = '1f764b67e18fc39697b1aad8bd0ac0de';
const citySearchEl = document.querySelector('#city-search');
const iconContainerEl = document.querySelector('.middle-right')
const cityNameContainerEl = document.querySelector('.name');
const dateContainerEl = document.querySelector('.date');
const statsContainerEl = document.querySelector('.stats');
const fiveDayContainerEl = document.querySelector('.five-day');

// Form Submit Handler
const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = citySearchEl.ariaValueMax.trim();

    if (city) {
        getCityWeather(city);

        citySearchEl.textContent = '';
        cityNameContainerEl.textContent = '';
        iconContainerEl.textContent = '';
        dateContainerEl.textContent = '';
        statsContainerEl.textContent = '';
        fiveDayContainerEl.textContent = '';
    } else {
        alert('You have entered and invalid City name');
    }
};

//get city weather (today)
const getCityWeather = function (city) {
    const apiUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(apiUrl) 
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                alert(`Error: ${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert('Unable to fetch Weather');
        });
};


// get 5 day forecast
const getFiveDayForecast = function(city) {
    const apiUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            })
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
}



// display weather 
const displayWeather = function (data) {
    const date = dayjs().format('MM/DD/YYYY');
    const cityNameEl = document.createElement('p');
    const cityTempEl = document.createElement('p');
    const cityWindsEl = document.createElement('p');
    const cityHumidityEl = document.createElement('p');

    cityNameEl.textContent = `${data.name} ${date}`;
    const cityTemp =(data.main.temp - 273.15) * (9 / 5) + 32;
    cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F`;
    cityWindsEl.textContent = `Wind: ${data.wind.speed} MPH`;
    cityHumidityEl.textContent = `Humidity: ${data.main.humidity} %`;


    //Append elements to page
}

//Display forecast
const displayForecast = function (data) {
    for (let i = 1; i <= 5; i++) {
        
    }
}


// Day js for forecast cards 
const forecastDate = function (i) {
    let today = dayjs();
    let forecastDay = today.add(i, 'day').format('MM/DD/YYYY');
    return forecastDay;
}