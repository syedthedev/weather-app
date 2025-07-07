import React from 'react';
import WeatherApp from './WeatherApp/WeatherApp.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <WeatherApp />
    </>
  )
}

export default App