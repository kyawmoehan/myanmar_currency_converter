import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyBar from "./components/CurrencyBar";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://forex.cbm.gov.mm/api/latest";

function App() {
  let [datas, setDatas] = useState();
  let [countries, setCountries] = useState([]);
  let [loading, setLoading] = useState(true);
  let [fromCountry, setFromCountry] = useState("USD");
  let [fromCountryRate, setFromCountryRate] = useState(1);
  let [myanmrRate, setMyanmarRate] = useState();

  useEffect(() => {
    fetch(proxyurl + BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.rates);
        setCountries(Object.keys(data.rates));
        setMyanmarRate(
          parseFloat(data.rates[fromCountry].replace(/,/g, "")) *
            fromCountryRate
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (datas) {
      setMyanmarRate(datas[fromCountry].replace(/,/g, "") * fromCountryRate);
    }
  }, [datas, fromCountryRate]);

  return (
    <>
      <h1>Myanmar Currency Converter</h1>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <CurrencyBar
            countries={countries}
            rate={fromCountryRate}
            changeRate={(e) => setFromCountryRate(e.target.value)}
          />
          <CurrencyBar countries={["Myan"]} rate={myanmrRate} />
        </>
      )}
    </>
  );
}

export default App;
