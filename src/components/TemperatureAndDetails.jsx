import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  const detail = [
    {
      icon: <UilTemperature size={18} className="mr-1" />,
      name: "Real fell:",
      content: `${feels_like.toFixed()}°`,
    },
    {
      icon: <UilTear size={18} className="mr-1" />,
      name: "Humdity:",
      content: `${humidity.toFixed()}%`,
    },
    {
      icon: <UilWind size={18} className="mr-1" />,
      name: "Wind:",
      content: `${speed.toFixed()} km/h`,
    },
  ];
  return (
    <div>
      <p className="py-6 text-xl text-cyan-300 text-center">{details}</p>

      <div className="flex items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="img" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          {detail.map((item) => (
            <div className="flex font-light txt-sm items-center justify-center">
              {item.icon}
              {item.name}
              <span className="font-medium ml-1">{item.content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 text-white text-sm py-3 font-light">
        <UilSun />
        <p className="">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p>|</p>

        <UilSunset />
        <p className="">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p>|</p>

        <UilArrowUp />
        <p className="">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p>|</p>

        <UilArrowDown />
        <p className="">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
