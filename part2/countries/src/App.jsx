import { useEffect, useState } from "react";
import Country from "./components/Country";
import CountryList from "./components/CountryList";
import countryService from "./services/countryService";
import weatherService from "./services/weatherService";

const apiKey = import.meta.env.VITE_SOME_KEY

function App() {
  const [lookFor, setLookFor] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capitalWeather, setCapitalWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    countryService.getCountries()
      .then((allCountries) => setCountries(allCountries))
      .catch((error) => console.error(error));
  }, []);

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(lookFor.toLowerCase())
  );
  const autoSelectedCountry = countriesToShow.length === 1 ? countriesToShow[0] : null
  const displayCountry = selectedCountry || autoSelectedCountry

  useEffect(() => {
    if (!displayCountry) return; 
    weatherService.getCityWeather(displayCountry.capital, displayCountry.cca2, apiKey)
    .then(cityWeather => { 
      setCapitalWeather(cityWeather)
    })
    .catch((error) => setErrorMessage(error));
  }, [displayCountry])

  const getCountryInfo = (name) => {
    countryService.getCountry(name)
      .then(countryInfo => setSelectedCountry(countryInfo));
  };

  let searchResult;

  if (!lookFor) {
    searchResult = null;
  } else if (countriesToShow.length > 10) {
    searchResult = <p>Too many matches, specify another filter</p>;
  } else if (displayCountry) {
    searchResult = <Country country={displayCountry} capitalWeather={capitalWeather} error={errorMessage} />;
  } else {
    searchResult = <CountryList countries={countriesToShow} getCountry={getCountryInfo} />
  }

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={lookFor}
          onChange={(e) => {
            setLookFor(e.target.value);
            setSelectedCountry(null)
            setErrorMessage(null)
          }}
        />
      </div>
      {searchResult}
    </>
  );
}

export default App;
