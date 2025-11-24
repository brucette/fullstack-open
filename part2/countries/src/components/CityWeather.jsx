const CityWeather = ({ city, imgSrc, imgAlt, temp, wind }) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
            <img
              src={imgSrc}
              alt={imgAlt}
              />
            <p>
              <b>Temperature:</b> {temp}{" "}
              Celsius
            </p>
            <p>
              <b>Wind:</b> {wind} m/s
            </p>
    </div>
  )
}

export default CityWeather