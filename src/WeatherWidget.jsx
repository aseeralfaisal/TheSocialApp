import { useEffect, useState } from "react";
import "./Styles/WeatherWidget.css";
import humidIco from "./icons/humidity.svg";
import pressureIco from "./icons/pressure.svg";
import windIco from "./icons/winds.svg";

const WeatherWidget = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const weather = async () => {
      const apiKey = "1518a183d454c495989f6bfae91edd0e";
      try {
        const apiCall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=dhaka,bangladesh&units=metric&appid=${apiKey}`
        );
        const response = await apiCall.json();
        setWeather(response);
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    weather();
  }, []);

  return (
    <>
      <div className="weather-parent">
        {typeof weather.main != "undefined" ? (
          <div className="weather">
            <h1>{weather.name}</h1>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1>{weather.main.temp}°c</h1>
            <div className="feels-like" style={{ marginLeft: "-7rem", fontSize:"0.9rem" }}>
              Feels like: {weather.main.feels_like} °c
            </div>
          </div>
        ) : (
          ""
        )}

        {typeof weather.main != "undefined" ? (
          <div className="weather1">
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <img src={humidIco} alt="" width="80px" />
              <h1 style={{ margin: "1rem 0.5rem" }}>
                Humidity: {weather.main.humidity}%
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <img src={pressureIco} alt="" width="60px" />
              <label>Pressure: {weather.main.pressure} Pa</label>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <img src={windIco} alt="" width="60px" />
              <label>Wind speed: {weather.wind.speed} mph</label>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default WeatherWidget;
