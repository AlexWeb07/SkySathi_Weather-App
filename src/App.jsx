import React from 'react'
import Background from './components/Background'
import WeatherState from './context/WeatherState'
import Header from './components/Header'
function App() {
  return (
    <WeatherState>
      <Background/>
    </WeatherState>
  )
}

export default App
