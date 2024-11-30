import React, { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');
  const [debouncedCity, setDebouncedCity] = useState(city);

  const apiKey = '89ca4150bdf08b063f71d2afb8eede09';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=${apiKey}&units=metric`;

  // Set up a debounced effect
  useEffect(() => {
    if (!debouncedCity) return; // Don't call API if the city is empty

    setError(''); // Reset error before fetching data

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);  // Data fetched successfully
        } else {
          setError(data.message);  // Show API error message
        }
      })
      .catch((err) => setError('Failed to fetch data'));  // Handle fetch errors
  }, [debouncedCity]);

  // Function to handle search button click
  const handleSearch = () => {
    setDebouncedCity(city); // Trigger weather fetch when search button is clicked
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-center mb-4">Weather App</h1>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : weather ? (
          <div>
            <div className="mb-2">
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
            >
              Search
            </button>

            {weather.main ? (
              <div className="text-center mt-4">
                <h2 className="text-xl">{weather.name}</h2>
                <p className="text-lg">{weather.main.temp}°C</p>
                <p>{weather.weather[0].description}</p>
              </div>
            ) : (
              <p className="text-center">Loading weather data...</p>
            )}
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
