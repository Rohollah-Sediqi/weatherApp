
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "c604a437f3e735a695fcd8f35f104f68";

weatherForm.addEventListener("submit", async event=>{

  event.preventDefault();
  const city = cityInput.value;
  if (city){
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch (error){
      console.log(error);
      displayError(error);
    }
  }
  else {
    displayError("please enter a city");
  }

});


async function getWeatherData(city){

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not find a weather");
  }
  return response.json();
}


function displayWeatherInfo(data){

  const {name: city,
        main:{temp ,humidity},
        weather:[{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `humidity: ${humidity}`;
  descDisplay.textContent = description;
  emojiDisplay.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  emojiDisplay.classList.add("emojiDisplay");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(emojiDisplay);
}


function getWeatherEmoji(weatherId){

  switch (true) {
    case (weatherId>= 200 && weatherId < 300 ):
      return "🌩";
    case (weatherId>= 300 && weatherId < 400 ):
      return "🌨";
    case (weatherId >= 400 && weatherId < 500 ):
      return "🌧";
    case (weatherId >= 500 && weatherId < 600 ):
      return "❄";
    case (weatherId >= 700 && weatherId < 800 ):
      return "🌫";
    case (weatherId === 800 ):
      return "🌞";
    case (weatherId >= 801 && weatherId < 810 ):
      return "☁";
    default:
      return "❓";
  }
}


function displayError(massage){

  const errorMassage = document.createElement("p");
  errorMassage.textContent = massage;
  errorMassage.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorMassage);

}