import React from "react";

const CurrencyBar = ({ countries, amount, changeAmount, changeCountry }) => {
  var showCountries = Object.keys(countries).map(function (key) {
    return (
      <option key={key} value={key}>
        {countries[key]}
      </option>
    );
  });

  return (
    <div className="form">
      <div className="webflow-style-input">
        <input type="number" value={amount} onChange={changeAmount} />
      </div>
      <div className="select">
        <select onChange={changeCountry} onBlur={changeCountry}>
          {showCountries}
        </select>
      </div>
    </div>
  );
};

export default CurrencyBar;
