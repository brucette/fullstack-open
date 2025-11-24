import CityWeather from "./CityWeather";

const Country = ({ country, capitalWeather = null, error = null }) => {
  
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
            weather={capitalWeather}
            error={error} />
        }
      </div>
    </>
  );
};

export default Country;
