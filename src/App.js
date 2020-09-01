import React, { useState, useEffect } from "react";
import "./App.css";
import CurrencyBar from "./components/CurrencyBar";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "http://forex.cbm.gov.mm/api/latest";
const Country_URL = "https://forex.cbm.gov.mm/api/currencies";

function App() {
  let [datas, setDatas] = useState();
  let [loading, setLoading] = useState(true);
  let [getCountries, setGetCountries] = useState({});

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
        setRate(parseFloat(data.rates["USD"].replace(/,/g, "")));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(proxyurl + Country_URL)
      .then((res) => res.json())
      .then((data) => {
        setGetCountries(data.currencies);
      })
      .catch((error) => {
        console.log(error);
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
    <div className="container">
      {loading ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div>
          <div className="converter">
            <h1 className="title">Myanmar Currency Converter</h1>
            <CurrencyBar
              countries={getCountries}
              amount={countryAmount}
              changeAmount={handleCountryAmount}
              changeCountry={(e) => setFromCountry(e.target.value)}
            />
            <CurrencyBar
              countries={["Myanmar Kyat"]}
              amount={myanmarAmount}
              changeAmount={handleMyanmarAmount}
            />
          </div>
        </div>
      )}
      <footer>
        <p>
          Copyright &copy; 2020
          <a
            href="http://kyawmoehan.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kyaw Moe Han
          </a>{" "}
        </p>
      </footer>
    </div>
  );
}

export default App;
