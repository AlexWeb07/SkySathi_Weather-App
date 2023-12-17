import React from 'react'
import WeatherCard from './WeatherCard'
import Header from './Header'

function Background() {
  return (
    <div className='bg w-full h-full bg-[var(--clr1)] bg-zinc-500 absolute top-0 left-0 flex justify-center items-center'>
      <Header/>
      <WeatherCard/>
    </div>
  )
}

export default Background
