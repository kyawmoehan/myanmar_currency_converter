import React from "react";

const CurrencyBar = ({ countries, amount, changeAmount, changeCountry }) => {
  return (
    <div>
      <input type="number" value={amount} onChange={changeAmount} />
      <select onChange={changeCountry} onBlur={changeCountry}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyBar;
