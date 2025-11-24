import axios from "axios";

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getCityWeather = (city, countryCode, apiKey) => {
  const request = axios.get(`${weatherUrl}${city},${countryCode}&APPID=${apiKey}`)
  return request.then(response => response.data);
};

export default { getCityWeather };
