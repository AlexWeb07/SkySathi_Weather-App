import React, { useContext, useState } from 'react'
import WeatherContext from '../context/WeatherContext'

function Header() {
    const context= useContext(WeatherContext);
    const {setCity}=context
    const [val,setVal]=useState("")
    const handleChange=(e)=>{
        setVal(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setCity(val);
        setVal("")
    }
  return (
    <div className='header absolute left-0 top-0 w-full h-[5rem] flex justify-between items-center'>
        <h1 className='ml-5 text-3xl font-semibold text-[var(--clr1)]'>Sky Sathi : Your Weather Site</h1>
        <form onSubmit={handleSubmit} className='header-form w-[50%] h-full flex justify-end items-center gap-2'>
            <input type="text" value={val} onChange={handleChange} className='header-input w-[13rem] h-[2.5rem] px-2 rounded-sm text-[var(--clr2)] text-xl outline-0 border-0 capitalize'  />
            <input type="submit" value="Search" className='search w-[5rem] h-[2rem] bg-[var(--clr2)] rounded-2xl font-semibold text-[var(--clr4)] hover:bg-zinc-950 hover:text-white' />
        </form>
    </div>
  )
}

export default Header
