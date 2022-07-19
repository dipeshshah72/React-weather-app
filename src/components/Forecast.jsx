import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  return (
    <div>
      <p className=" text-white font-medium uppercase mt-6">{title}</p>
      <hr className="my-2" />

      <div className="flex items-center justify-center justify-between text-white">
        {items.map((item) => (
          <div className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              alt="img"
              className="w-12 my-1"
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
