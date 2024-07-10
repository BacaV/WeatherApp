import { useState, useEffect } from 'react'
import './App.css'

const KEY = import.meta.env.VITE_GET_APP_ID;

function App() {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ city, setCity ] = useState("Belgrade");
  const [ data, setData ] = useState({});


  useEffect(() => {
    getWeather(city, KEY);
  }, []);

  const getWeather = async (city, api) => {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`)
        const json = await response.json();
        setData(json);
        console.log(data);
    } catch (error){
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCityChange(e){
    setCity(e.target.value);
  }

  function handleCity(){
    getWeather(city, KEY)
  }

  

  if(!isLoading){
  return (
    <>
    <div className='background'>
    </div>
        <div className='weather-card'>
          <h1 className='title'> Weather App. Made by Nikola J.</h1>
          <div className='input-wrapper'>
            <input type="text" id='cityInput' value={city} onChange={handleCityChange} />
            <button onClick={handleCity}>Get Weather</button>
          </div>

          <h2>Todays weather in {data.name}</h2>
          <div className='description'>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
            <p>{data.weather[0].description.toUpperCase()}</p>
          </div>
          <div className='data-wrapper'>
            <div className='field-wrapper'>
                <div className='data-field'>
                    <p>Temperature: {data.main.temp}</p>
                </div>
                <div className='data-field'>
                    <p>Max: {data.main.temp_max}</p>
                </div>
                <div className='data-field'>
                    <p>Min: {data.main.temp_min}</p>
                </div>
                <div className='data-field'>
                    <p>Feeling: {data.main.feels_like}</p>
                </div>
                
              </div>
              <div className='field-wrapper'>
                <div className='data-field'>
                    <p>Humidity: {data.main.humidity}</p>
                </div>
                <div className='data-field'>
                    <p>Wind speed: {data.wind.speed}</p>
                </div>
                <div className='data-field'>
                    <p>Lon: {data.coord.lon}</p>
                </div>
                <div className='data-field'>
                    <p>Lat: {data.coord.lat}</p>
                </div>
              </div>
          </div>
          

          
        </div>
    
    </>
  );
} else {
  return null;
}
}

export default App
