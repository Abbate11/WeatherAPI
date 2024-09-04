const apiKey = '1f764b67e18fc39697b1aad8bd0ac0de';
const citySearchEl = document.querySelector('#city-search');
const iconContainerEl = document.querySelector('.middle-right');
const cityNameContainerEl = document.querySelector('.name');
const dateContainerEl = document.querySelector('.date');
const statsContainerEl = document.querySelector('.stats');
const fiveDayContainerEl = document.querySelector('.five-day-container');
const searchBtn = document.querySelector('#search');
const recentSearches = document.querySelector('.recent-searches');
const weatherIconContianer = document.querySelector('.middle-right');

// Form Submit Handler
const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = citySearchEl.value.trim();

    if (city) {
        savedCities();
        getCityWeather(city);

        citySearchEl.value = '';
        cityNameContainerEl.innerHTML = '';
        dateContainerEl.innerHTML = '';
        weatherIconContianer.innerHTML = '';
        statsContainerEl.innerHTML = '';
        fiveDayContainerEl.innerHTML = '';
    } else {
        alert('You have entered and invalid City name');
    }
};

//get city weather (today)
const getCityWeather = function (city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    fetch(apiUrl) 
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                    getFiveDayForecast(city);
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
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data)
                displayForecast(data)
            })
        } else {
            alert(`Error: ${response.statusText}`);
        }
    })
}



// display weather 
const displayWeather = function (data) {
    
    const date = dayjs().format('MM/DD/YYYY');
    const todayDate = document.createElement('p')
    const cityNameEl = document.createElement('p');
    const cityTempEl = document.createElement('p');
    const cityWindsEl = document.createElement('p');
    const cityHumidityEl = document.createElement('p');
    const weatherIconEl = document.createElement('span')

// Switch statement for choosing the corresponding weather Icon 
    weatherIconEl.setAttribute('class', 'material-symbols-outlined');
    switch (data.weather[0].icon) {
        case "01d":
            wIcon = 'sunny';
            break;
        case "01n":
            wIcon = 'clear_night';
            break;
        case "02d":
            wIcon = 'partly_cloudy_day';
            break;
        case "02n":
            wIcon = 'partly_cloudy_night';
            break;
        case "03d":
        case "03n":
            wIcon = 'cloud';
            break;
        case "04d":
        case "04n":
            wIcon = 'cloud';
            break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            wIcon = 'rainy';
            break;
        case "11d":
        case "11n":
            wIcon = 'thunderstorm';
            break;
        case "13d":
        case "13n":
            wIcon = 'ac_unit';
            break;
        case "50d":
        case "50n":
            wIcon = 'mist';
            break;
    }

    

    todayDate.textContent = date;
    cityNameEl.textContent = `${data.name}`;
    weatherIconEl.textContent = wIcon;
    const cityTemp =(data.main.temp - 273.15) * (9 / 5) + 32;
    cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F`;
    cityWindsEl.textContent = `Wind: ${data.wind.speed} MPH`;
    cityHumidityEl.textContent = `Humidity: ${data.main.humidity} %`;
 //Append elements to page
    cityNameContainerEl.appendChild(cityNameEl);
    dateContainerEl.appendChild(todayDate);
    weatherIconContianer.appendChild(weatherIconEl);
    statsContainerEl.appendChild(cityTempEl);
    statsContainerEl.appendChild(cityWindsEl);
    statsContainerEl.appendChild(cityHumidityEl);
}

//Display forecast
const displayForecast = function (data) {
    for (let i = 1; i <= 5; i++) {
        const forecastCard = document.createElement('div');
        forecastCard.setAttribute('class', 'five-day');

        const cityDate = document.createElement('p');
        const forecastIcon = document.createElement('span')
        const cityTempEl = document.createElement('p');
        const cityWindEl = document.createElement('p');
        const cityHumidityEl = document.createElement('p');

        const date = forecastDate(i)

        forecastIcon.setAttribute('class', 'material-symbols-outlined');
        switch (data.list[i].weather[0].icon) {
            case "01d":
                wIcon = 'sunny';
                break;
            case "01n":
                wIcon = 'clear_night';
                break;
            case "02d":
                wIcon = 'partly_cloudy_day';
                break;
            case "02n":
                wIcon = 'partly_cloudy_night';
                break;
            case "03d":
            case "03n":
                wIcon = 'cloud';
                break;
            case "04d":
            case "04n":
                wIcon = 'cloud';
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                wIcon = 'rainy';
                break;
            case "11d":
            case "11n":
                wIcon = 'thunderstorm';
                break;
            case "13d":
            case "13n":
                wIcon = 'ac_unit';
                break;
            case "50d":
            case "50n":
                wIcon = 'mist';
                break;
        }

        console.log(data.list[i].weather[0].icon);

        cityDate.textContent = `${date}`;
        const cityTemp = (data.list[i].main.temp - 273.15) * (9 / 5) + 32;
        cityTempEl.textContent = `Temp: ${cityTemp.toFixed(2)} F`;
        cityWindEl.textContent = `Wind: ${data.list[i].wind.speed} MPH`;
        cityHumidityEl.textContent = `Humidity: ${data.list[i].main.humidity} %`;
        forecastIcon.textContent = wIcon;
    

        forecastCard.appendChild(cityDate);
        forecastCard.appendChild(forecastIcon);
        forecastCard.appendChild(cityTempEl);
        forecastCard.appendChild(cityWindEl);
        forecastCard.appendChild(cityHumidityEl);
        fiveDayContainerEl.appendChild(forecastCard);
    }
}


// Day js for forecast cards 
const forecastDate = function (i) {
    let today = dayjs();
    let forecastDay = today.add(i, 'day').format('MM/DD/YYYY');
    return forecastDay;
}

// Save recent searches to local storage
const savedCities = function () {
    let city = citySearchEl.value;
    let cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
    cityHistory.push(city)
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
    displayRecentSearches(cityHistory);
}
   const displayRecentSearches = function (cityHistory) {
    recentSearches.innerHTML = '';

// display recent search buttons
    cityHistory.forEach(city => {
        const historyButton = document.createElement('button');
        historyButton.textContent = city;
        historyButton.setAttribute('class', 'past');
        recentSearches.appendChild(historyButton);
// Bring up weather data for clicked recent city
       historyButton.addEventListener('click', (event) => {
        event.preventDefault()
        let passedCity = historyButton.textContent
        getCityWeather(passedCity)
        cityNameContainerEl.innerHTML = ''
        dateContainerEl.innerHTML = ''
        weatherIconContianer.innerHTML = ''
        statsContainerEl.innerHTML = ''
        fiveDayContainerEl.innerHTML = ''
       })
    })
   }


//attach on click listener to search button 
searchBtn.addEventListener('click', formSubmitHandler);
