import React from "react";

const CurrencyBar = ({ countries, rate, changeRate }) => {
  return (
    <div>
      <input type="number" value={rate} onChange={changeRate} />
      <select>
        {countries.map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyBar;
