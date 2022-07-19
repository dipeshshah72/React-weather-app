import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <p className="text-white text-xl font-extralight text-center">
        {formatToLocalTime(dt, timezone)}
      </p>
      <p className="my-3 text-white text-3xl font-medium text-center">
        {`${name}, ${country}`}
      </p>
    </div>
  );
}

export default TimeAndLocation;
