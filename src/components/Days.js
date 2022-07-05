import React from "react";

function Days(props) {

  const date = new Date(props.date * 1000); //en millisecond pour js
  const today = (new Intl.DateTimeFormat('es-ES', { weekday: 'long'}).format(date));
  
  function handleClick(e) {

    let links = document.querySelectorAll('a');
    links.forEach(dayy => {
        dayy.style.fontWeight = 'normal'
    });
    e.target.style.fontWeight = "bold"
    e.preventDefault();
    props.goNextDay(e.target.getAttribute('data-time'))
  }

  function displayDays(){

    if (props.nextDays.length > 0) {
      return props.nextDays.map((element)=>{
        let dayOfWeek = (new Intl.DateTimeFormat('es-ES', { weekday: 'long'}).format(new Date(element * 1000)));    
        return (<a onClick={handleClick} data-time={element} href="">{dayOfWeek}</a>)
      })
    }
  }  

  return (
      <div className="card-action">
         <a onClick={handleClick} data-time={props.date} href="">{today}<span className="little"> (hoy)</span></a>
         {displayDays()}
      </div>
  );
}

export default Days