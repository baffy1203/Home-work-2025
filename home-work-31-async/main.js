const cityNameElement = document.getElementById("cityName");
const getWeatherButton = document.getElementById("getButton");
const resultElement = document.getElementById("result");

getWeatherButton.addEventListener("click", async () => {
  const cityName = cityNameElement.value.trim();

  if (!cityName) {
    resultElement.innerHTML = "Введіть місто";
    return;
  }

  const data = await getWeather(cityName);

  if (!data) {
    resultElement.innerHTML = "Таке місто не знайдено";
    return;
  }

  resultElement.innerHTML = `
    <h3>${data.name}</h3>
    Температура: ${data.main.temp} °C <br>
    Тиск: ${data.main.pressure} hPa <br>
    Опис: ${data.weather[0].description} <br>
    Вологість: ${data.main.humidity}% <br>
    Швидкість вітру: ${data.wind.speed} м/с <br>
    Напрям: ${data.wind.deg}° (${getWindDirection(data.wind.deg)}) <br>
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
  `;
});
function getWindDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) return "Північний";
  if (deg < 67.5) return "Північний схід";
  if (deg < 112.5) return "Східний";
  if (deg < 157.5) return "Південний схід";
  if (deg < 202.5) return "Південний";
  if (deg < 247.5) return "Південний захід";
  if (deg < 292.5) return "Західний";
  return "Північний захід";
}

async function getWeather(name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=5d066958a60d315387d9492393935c19`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
