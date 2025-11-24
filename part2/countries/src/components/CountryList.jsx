const CountryList = ({ countries, getCountry }) => {
  return (
    <div>
      {countries.map((c) => (
        <p key={c.name.common}>
          {c.name.common}
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => getCountry(c.name.common)}
          >
            show
          </button>
        </p>
      ))}
    </div>
  );
};

export default CountryList;
