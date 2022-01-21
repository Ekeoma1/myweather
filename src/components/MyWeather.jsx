import React, { useState } from "react";
import axios from "axios";

const MyWeather = () => {
  const [Place, setPlace] = useState("");
  const [weather, setWeather] = useState([]);
  const [Err, setErr] = useState("");

  const onInputChange = (event) => {
    setPlace(event.target.value);
  };

  const apiKey = "90549a395605ebca3c35e16efb990dad";

  const PSApiKey = "852e1341f8f491bcb87112a9847b9060";

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // positionstack api for converting address to latitude and longitude
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${PSApiKey}&query=${Place}`,
      {}
    );
    const fetchedData = response.data.data[0];
    const currentLat = fetchedData.latitude;
    const currentLong = fetchedData.longitude;

    // openweather Api for fetching weather forcast

    const newResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLong}&units=metric&appid=${apiKey}`
    );

    setWeather(newResponse.data.daily);
    console.log(newResponse.data.daily);
  };

  const Display = weather.map((info, index) => {
    // convert unixtimestamp to human readable time
    const unixTimestamp = info.dt;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString();

    return (
      <div key={index + 1} className="weather-card">
        {/* <div className="location">{Place}</div> */}
        <div className="date">{humanDateFormat}</div>
        <div className="max-temp">
          {info.temp.max}
          <sup>°C</sup>
        </div>
        <div className="current-temp">
          {info.temp.day}
          <sup>°C</sup>
        </div>
        <div className="min-temp">
          {info.temp.min}
          <sup>°C</sup>
        </div>
        <div>
          <img
            src={`https://openweathermap.org/img/w/${info.weather[0].icon}.png`}
            alt=""
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="heading">My Weather</h1>
      <form onSubmit={onFormSubmit} action="">
        <input
          type="text"
          placeholder="Enter a city"
          className="input-box"
          value={Place}
          onChange={onInputChange}
        />
        <input className="form-btn" type="submit" value="search" />
      </form>
      <div>{Err}</div>

      <div className="weather-card-wrapper">{Display}</div>
    </div>
  );
};

export default MyWeather;
