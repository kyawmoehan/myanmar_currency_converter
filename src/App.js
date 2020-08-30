import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyBar from "./components/CurrencyBar";
import ShowCurrencies from "./components/ShowCurrencies";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://forex.cbm.gov.mm/api/latest";

function App() {
  let [datas, setDatas] = useState();
  let [countries, setCountries] = useState([]);
  let [loading, setLoading] = useState(true);

  let [toFromChange, setToFromChange] = useState(true);
  let [rate, setRate] = useState();
  let [fromCountry, setFromCountry] = useState();
  let [amount, setAmount] = useState(1);

  let myanmarAmount, countryAmount;

  if (toFromChange) {
    countryAmount = amount;
    myanmarAmount = amount * rate;
  } else {
    myanmarAmount = amount;
    countryAmount = myanmarAmount / rate;
  }

  useEffect(() => {
    fetch(proxyurl + BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.rates);
        setCountries(Object.keys(data.rates));
        setRate(parseFloat(data.rates["USD"].replace(/,/g, "")));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (fromCountry != null) {
      setRate(parseFloat(datas[fromCountry].replace(/,/g, "")));
    }
  }, [fromCountry, datas]);

  function handleCountryAmount(e) {
    setAmount(e.target.value);
    setToFromChange(true);
  }

  function handleMyanmarAmount(e) {
    setAmount(e.target.value);
    setToFromChange(false);
  }

  return (
    <>
      <h1>Myanmar Currency Converter</h1>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <CurrencyBar
            countries={countries}
            amount={countryAmount}
            changeAmount={handleCountryAmount}
            changeCountry={(e) => setFromCountry(e.target.value)}
          />
          <CurrencyBar
            countries={["Myan"]}
            amount={myanmarAmount}
            changeAmount={handleMyanmarAmount}
          />
          <ShowCurrencies />
        </>
      )}
    </>
  );
}

export default App;
