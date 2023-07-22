import React, { useState } from "react";
import "./WeatherCard.css";

interface Props {
  weekDay?: string;
  location?: string;
  highTemp?: number;
  lowTemp?: number;
  condition?: string;
  windMPH?: number;
  icon?: string;
  sunrise?: string;
  sunset?: string;
}

const WeatherCard = ({
  weekDay,
  highTemp,
  lowTemp,
  condition,
  windMPH,
  icon,
  sunset,
  sunrise,
}: Props) => {
  const [isHover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <>
      <div
        className="hover-lg card shadow-sm border border-warning m-5 d-flex align-items-center"
        style={{ width: "18rem" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h5 className="card-title">{weekDay}</h5>
        <img
          src={icon}
          className="card-img-top "
          alt="..."
          style={{ width: "50px", height: "50px" }}
        />
        <div className="card-body">
          <p>{condition}</p>
          <p className="card-text">High: {highTemp}&deg;F</p>
          <p className="card-text">Low: {lowTemp}&deg;F</p>
          <p className="card-text">Wind: {windMPH}MPH</p>
          {isHover && (
            <div>
              <p className="card-text">Sunrise: {sunrise}</p>
              <p className="card-text">Sunset: {sunset}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
