import { DateTime } from "luxon";

const API_KEY = "4522fe87a882d18f27231f6cde7f998b"
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(BASE_URL + "/" + infoType )
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url).then((res) => res.json());
}

const formatCurrentWeather =(data) =>{
    const  {
        coord:{lat,lon},
        main:{temp,feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise, sunset},
        weather,
        wind:{speed}
    } = data

    const {main:details, icon} = weather[0]

    return {
        lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed,
    }

}
const formatForecaseWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.splice(1,6).map(d =>{
        return {
            title:formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon:d.weather[0].icon
        }
    })

    hourly = hourly.splice(1,6).map(d =>{
        return {
            title:formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon:d.weather[0].icon
        }
    })
    return {timezone, daily, hourly}
}

const getFormattedWeatherData =  async (searchParams) =>{
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

    const formattedForecaseWeatber = await getWeatherData("onecall",{lat,lon,exclude:"current,minutely,alerts", units:searchParams.units,}).then(formatForecaseWeather) 


    return {...formattedCurrentWeather, ...formattedForecaseWeatber}
}

// for date time
const formatToLocalTime = (secs,zone,format = "cccc, dd LLL yyyy ' | Local time: 'hh:mm a")=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode}