import Notification from "./Notification";

const CityWeather = ({ city, weather, error }) => {

  if (error) {
    return <Notification message={`Could not get weather information for ${city}`} />
  }

  if (!weather) return null;

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);
  const iconCode = weather?.weather[0].icon;
  const description = weather?.weather[0].description;
  const iconSource = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div>
      <h2>Weather in {city}</h2>
        <img
          src={iconSource}
          alt={description}
          />
        <p>
          <b>Temperature:</b> {kelvinToCelsius(weather.main.temp)}{" "}
          Celsius
        </p>
        <p>
          <b>Wind:</b> {weather.wind.speed} m/s
        </p>
    </div>
  )
}

export default CityWeather