import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import Weather from './components/Weather';
import Icons from "./components/Icons";
import Input from "./components/Input";

export const DateContext = React.createContext()

function App() {

  useEffect(() => {
    document.title = `My Weather`
    fetchWeather()
  }, [])

  // to display today wheather
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [windDeg, setWindDeg] = useState("");
  const [icon, setIcon] = useState("");
  // to display next days
  const [date, setDate] = useState("");
  const [days, setDays] = useState("");
  const [alldata, setAllData] = useState("");
  // get localisation
  const [input, setInput] = useState("");

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

  const search = e => {
    setInput(e.target.value);
  }

  const handleSubmit = () =>{
    
    if (input !== ''){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=99cc9e47d1d13031efb082882d61dfff&units=metric`)
          .then(response => response.json())
          .then(data => {
            setData(data);
            localStorage.setItem(data.city.name, JSON.stringify(data.city.name)); 
          }); 
          setInput(''); 
    }else{
      fetchWeather()
    }
  };  

  return (
    <DateContext.Provider value={{date, days, goNextDay}} >
      <div className="App">
        <Header />
        <Input 
          search={search}
          submit={handleSubmit}
        />
        <Weather 
          name={name}
          temperature={temperature}
          wind={wind}
          windDeg={windDeg}
          icon={icon}
        />
      </div>
    </DateContext.Provider>
  );
}

export default App;
