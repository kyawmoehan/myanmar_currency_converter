import React, { useState, useEffect } from "react";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://forex.cbm.gov.mm/api/currencies";

const ShowCurrencies = React.memo(() => {
  let [currencies, setCurrencies] = useState({});

  useEffect(() => {
    fetch(proxyurl + BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data.currencies);
      });
  }, [setCurrencies]);
  var showCurrencies = Object.keys(currencies).map(function (key) {
    return (
      <p key={key}>
        {key}:{currencies[key]}
      </p>
    );
  });
  console.log("h");
  return (
    <div>
      <h2>Currencies</h2>
      {showCurrencies}
    </div>
  );
});

export default ShowCurrencies;
