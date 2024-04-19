import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import WeatherContext from '../context/WeatherContext';

function WeatherCard() {
    const context=useContext(WeatherContext);
    const {weather,getWeather,city,setCity,setWeather}=context;
    const apiKey = import.meta.env.VITE_API_KEY;
    const [convert,setConvert]=useState({c:["text-[var(--clr1)]",true],f:["text-[var(--clr3)]",false]})
    const [text,setText]=useState("℃")

    const changeToF=(e)=>{
        const tempF=((9/5 * weather.temp) + 32).toFixed(2)
        const flF=((9/5 * weather.fl) + 32).toFixed(2)
        setWeather({...weather,temp:tempF,fl:flF})
        setConvert({c:["text-[var(--clr3)]",false],f:["text-[var(--clr1)]",true]})
        setText("℉")
    }
    const changeToC=(e)=>{
        const tempF=((weather.temp- 32) * 5/9).toFixed(2)
        const flF=((weather.fl-32) *5/9).toFixed(2)
        setWeather({...weather,temp:tempF,fl:flF})
        setConvert({c:["text-[var(--clr1)]",true],f:["text-[var(--clr3)]",false]})
        setText("℃")
    }

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position)=>{
                const lat=position.coords.latitude
                const lon=position.coords.longitude;
                const response= await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
                const data=await response.json();
                // console.log(data[0].name);
                setCity(data[0].name)
            })
        } 
    },[])

    useEffect(()=>{  
        getWeather(city)
        setConvert({c:["text-[var(--clr1)]",true],f:["text-[var(--clr3)]",false]})
    },[city])
    return(
        <div className='card w-[25rem] h-[30rem] rounded-lg backdrop-blur-sm flex flex-col justify-start gap-3'>

            <div className='w-full h-[auto] flex flex-row justify-center items-center pt-4 '>
                <IoLocationSharp className='w-[2.2rem] h-[2.2rem] text-[var(--clr4)]'/>
                <p className='text-[1.4rem] text-[var(--clr3)]'>{weather.location}</p>
            </div>

            <div className='w-full h-[8rem] flex justify-center items-center'>
                <img src={weather.icon} alt="" />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <span className='text-[var(--clr1)] text-3xl'>
                   {weather.temp}&nbsp;
                    <button onClick={changeToC} disabled={convert.c[1]} className={convert.c[0]} >℃</button>
                    &nbsp;|&nbsp;
                    <button onClick={changeToF} disabled={convert.f[1]} className={convert.f[0]} >℉</button> 
                </span>
                <p className='text-[var(--clr2)]'>Feels Like {weather.fl}&nbsp; <span>{text}</span></p>
            </div>

            <div className='w-full flex flex-col justify-center items-center  text-[var(--clr3)] text-xl'>
                <h4>{weather.title}</h4>
                <p className='text-sm'>{weather.desc}</p>
            </div>

            <div className='w-full flex flex-col justify-center items-center  text-[var(--clr1)] text-xl'>
                <p>Humidity : <span>{weather.humid}%</span></p>
            </div>

            <div className='w-full flex flex-row justify-between items-center text-[var(--clr4)] text-md mt-7 ml-4'>
                <div className='w-[50%] h-[5rem] flex flex-row jsutify-center items-center gap-2'>
                    <span>
                        <lord-icon
                            src="https://cdn.lordicon.com/nmpbxpnc.json"
                            trigger="loop"
                            colors="primary:#8ECDDD,secondary:#ffcc70"
                            style={{width:"5rem",height:"5rem"}}>
                        </lord-icon>
                    </span>
                    <p className='text-[var(--clr1)] text-sm'>
                        <span className='text-[var(--clr2)]'>{weather.wind_speed} m/s</span><br />
                        Wind Speed
                    </p>
                </div>
                <div className='w-[50%] h-[5rem] flex flex-row jsutify-center items-center gap-2'>
                    <span>
                        <lord-icon
                            src="https://cdn.lordicon.com/vfczflna.json"
                            trigger="loop"
                            state="hover-look-around"
                            colors="primary:#8ECDDD,secondary:#ffcc70"
                            style={{width:"5rem",height:"5rem"}}>
                        </lord-icon>
                    </span>
                    <p className='text-[var(--clr1)] text-sm'>
                        <span className='text-[var(--clr2)]'>{weather.visibility} km</span><br />
                        Visibility
                    </p>
                </div>
            </div>
        </div>
      )
  }

export default WeatherCard
