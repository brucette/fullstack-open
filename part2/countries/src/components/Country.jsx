import CityWeather from "./CityWeather";
import Notification from "./Notification";

const Country = ({ country, capitalWeather = null, error = null }) => {

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);
  
  const iconCode = capitalWeather?.weather[0].icon;
  const description = capitalWeather?.weather[0].description;
  const iconSource = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <p>
          <b>Capital:</b> {country.capital}
        </p>
        <p>
          <b>Area:</b> {country.area}
        </p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <div
        style={{
          margin: "20px",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          display: "inline-block",
        }}
      >
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <div>
        {capitalWeather &&
          <CityWeather 
            city={country.capital}
            imgSrc={iconSource}
            imgAlt={description}
            temp={kelvinToCelsius(capitalWeather.main.temp)}
            wind={capitalWeather.wind.speed} />
        }
        {error && 
          <Notification message={`Could not get weather information for ${country.capital}`} />
        }
      </div>
    </>
  );
};

export default Country;
