    const [weather,setWeather]=useState({title:"",desc:"",temp:null});
    const apiKey = import.meta.env.VITE_API_KEY;

    const getWeather = async()=>{
        // gettin latitude and longitude
        const locationData=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=jamshedpur,in&limit=1&appid=${apiKey}`)
        const locationRes=await locationData.json();
        const lat=locationRes[0].lat;
        const lon=locationRes[0].lon;
        
        // getting weather
        const weatherData=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const weatherRes= await weatherData.json();
        setWeather({
            title:weatherRes.weather[0].main,
            desc:weatherRes.weather[0].description,
            temp:weatherRes.main.temp-273.15,
        });
        console.log(epochToJsDate(weather.time));
    }
    useEffect(()=>{  
        getWeather();
    },[])