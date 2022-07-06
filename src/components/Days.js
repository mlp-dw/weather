import React, { useContext } from "react";
import { DateContext } from "../App";

function Days() {
  const goDayDate = useContext(DateContext);

  const date = new Date(goDayDate.date * 1000); //en millisecond pour js
  const today = (new Intl.DateTimeFormat('es-ES', { weekday: 'long'}).format(date));
  
  function handleClick(e) {

    let links = document.querySelectorAll('a');
    links.forEach(dayy => {
        dayy.style.fontWeight = 'normal'
    });
    e.target.style.fontWeight = "bold"
    e.preventDefault();
    goDayDate.goNextDay(e.target.getAttribute('data-time'))
  }

  function displayDays(){

    if (goDayDate.days.length > 0) {
      return goDayDate.days.map((element)=>{
        let dayOfWeek = (new Intl.DateTimeFormat('es-ES', { weekday: 'long'}).format(new Date(element * 1000)));    
        return (<a onClick={handleClick} data-time={element} href="">{dayOfWeek}</a>)
      })
    }
  }  

  return (
      <div className="card-action">
         <a onClick={handleClick} data-time={goDayDate.date} href="">{today}<span className="little"> (hoy)</span></a>
         {displayDays()}
      </div>
  );
}

export default Days