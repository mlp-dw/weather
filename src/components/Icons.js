import sun from "../icons/sun.svg";
import cloudy from "../icons/cloudy.svg";
import rain from "../icons/rainy.svg";
import snow from "../icons/snowy.svg";
import thunder from "../icons/thunder.svg";
import windy from "../icons/windy.svg";


class Icons {

    static weather = {
        "Clear": sun,
        "Clouds": cloudy,
        "Rain": rain,
        "Snow": snow,
        "Drizzle": rain,
        "Thunderstorm": thunder,
        "Mist": windy,
        "Smoke":windy,
        "Haze": windy,
        "Dust": windy,
        "Fog": windy,
        "Sand": windy,
        "Ash": windy,
        "Squall": windy,
        "Tornado": windy
    };

    static getIcon(icon){
        return this.weather[icon];
    }
}

export default Icons