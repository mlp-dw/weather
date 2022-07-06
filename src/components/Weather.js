import React from "react";
import Days from "./Days";

function Weather(props) {
  
    return (
        <div className="row">
          <div className="col s12 m6 push-m3">
            <div className="weather card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{props.name}</span>
                <p>
                  <img src={props.icon} alt='meteo-icon'/>
                </p>
                <span className="temperature">{props.temperature}°</span>
                <div className="wind">Vent {props.wind}km/h ({props.windDeg}°)</div>
              </div>
              <Days />
            </div>
          </div>
        </div>
    );
}

export default Weather