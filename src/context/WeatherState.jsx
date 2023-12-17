import React, { useState } from 'react'
import WeatherContext from './WeatherContext'

function WeatherState(props) {
    const[city,setCity]=useState("jodhpur");
    const [weather,setWeather]=useState({location:"",title:"",desc:"",icon:"",temp:null,fl:null,humid:null,visibility:null,wind_speed:null,time:"",result:true});
    const apiKey = import.meta.env.VITE_API_KEY;

    const getWeather = async(city)=>{
        try {
        // gettin latitude and longitude
        const locationData=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},in&limit=1&appid=${apiKey}`)
        const locationRes=await locationData.json();
        const lat=locationRes[0].lat;
        const lon=locationRes[0].lon;
        const location= locationRes[0].name;
        
            // getting weather
        const weatherData=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const weatherRes= await weatherData.json();
        setWeather({
            location,
            title:weatherRes.weather[0].main,
            desc:weatherRes.weather[0].description,
            icon:`https://openweathermap.org/img/wn/${weatherRes.weather[0].icon}@4x.png`,
            temp:(weatherRes.main.temp-273.15).toFixed(2),
            fl:(weatherRes.main.feels_like-273.15).toFixed(2),
            humid:weatherRes.main.humidity,
            visibility:weatherRes.visibility/1000,
            wind_speed:weatherRes.wind.speed,
        });
        } catch (error) {
            console.log(error);
        }
    }

  return (
   <WeatherContext.Provider value={{weather,setWeather,getWeather,setCity,city}}>
        {props.children}
   </WeatherContext.Provider>)
}

export default WeatherState
