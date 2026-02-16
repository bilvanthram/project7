import React, { useState } from 'react';
import './App.css';

const API_KEY = 'a0b4cc52a527ecbf66aa7dce55999876'
export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }

    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className='app'>
      <div className='header'>
        <h1>🌤Weather App</h1>
      </div>

      <div className='search-box'>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={getWeather}>Search</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      {weather && (
        <div className="weather-container">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <p>{weather.weather[0].description}</p>
          <div className="details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      <div className="footer">
        <p>Copyright 2026 Weather App. All rights reserved. - @ 2500030296 Ashutosh</p>
      </div>
    </div>
  );
}