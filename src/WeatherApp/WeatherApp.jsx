import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./WeatherApp.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = async (e) => {
    e.preventDefault();

    if (city.trim() === "") {
      toast.error("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      );
      setWeather(response.data);
    } catch (err) {
      toast.error("City not found 😕");
      setWeather(null);
    }
  };

  const getEmoji = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "drizzle":
        return "🌦️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "haze":
      case "fog":
        return "🌫️";
      default:
        return "🌍";
    }
  };

  return (
    <div className="weather-container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="title">🌦 Weather App</h1>
      <form onSubmit={getWeather} className="weather-form">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.trim() === "") {
              setWeather(null);
            }
          }}
        />
        <button type="submit" className="search-btn">Get Weather</button>
      </form>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="emoji">{getEmoji(weather.weather[0].main)}</p>
          <p className="temperature">{Math.round(weather.main.temp)}°F</p>
          <p className="description">{weather.weather[0].description}</p>
          <p className="humidity">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
