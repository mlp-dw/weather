import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import Weather from './components/Weather';
import Icons from "./components/Icons";

function App() {

  useEffect(() => {
    document.title = `My Weather`
    fetchWeather()
  }, [])

  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [windDeg, setWindDeg] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [alldata, setAllData] = useState("")

  const setData = (data) => {                
    setName(data.city.name)
    setTemperature(data.list[0].main.temp.toFixed(1))
    setWind(data.list[0].wind.speed)
    setWindDeg(data.list[0].wind.deg)
    setIcon(Icons.getIcon(data.list[0].weather[0].main))
    setDate(data.list[0].dt)
    setDays([
      data.list[0].dt + 86400,
      data.list[0].dt + (86400 * 2),
      data.list[0].dt + (86400 * 3),
      data.list[0].dt + (86400 * 4),
    ]) 
    setAllData(data)
  }; 
 
  function goNextDay(timestamp){
    alldata.list.forEach(weatherDay => {
      if (weatherDay.dt == timestamp) {
        setTemperature(weatherDay.main.temp.toFixed(1))
        setWind(weatherDay.wind.speed)
        setWindDeg(weatherDay.wind.deg)
        setIcon(Icons.getIcon(weatherDay.weather[0].main))
      }  
    });  
  };  
  function fetchWeather() {
    let lat = '57.053055';
    let lon = '-135.330002';
    let apiKey = '99cc9e47d1d13031efb082882d61dfff';
    let unit = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    
    fetch(url, {method: 'GET'})
        .then((response) => {
            return response.json();
          })
        .then((data) => {
            setData(data);
        })
        .catch(console.err);
    
  }

  return (
    <div className="App">
      <Header />
      <Weather 
        name={name}
        temperature={temperature}
        wind={wind}
        windDeg={windDeg}
        icon={icon}
        date={date}
        nextDays={days}
        goNextDay={goNextDay}
      />
    </div>
  );
}

export default App;
