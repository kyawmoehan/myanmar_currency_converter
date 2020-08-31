import React from "react";

const CurrencyBar = ({ countries, amount, changeAmount, changeCountry }) => {
  return (
    <div className="form">
      <div className="webflow-style-input">
        <input type="number" value={amount} onChange={changeAmount} />
      </div>
      <div className="select">
        <select
          onChange={changeCountry}
          onBlur={changeCountry}
          ame="slct"
          id="slct"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyBar;
