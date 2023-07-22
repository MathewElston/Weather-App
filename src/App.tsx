import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import LoadingCard from "./components/LoadingCard";
import WeatherAPI from "./services/WeatherAPI";
import { CanceledError } from "axios";
import getWeekday from "./calendar/Weekdays";
import SearchBar from "./components/SearchBar";

interface Weather {
  date?: string;
  weekDay?: string;
  location: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  windMPH: number;
  icon: string;
}

const App = () => {
  const [forecast, setForecast] = useState<Weather[]>();
  const [location, setLocation] = useState("");
  const [days, setDays] = useState(3);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    WeatherAPI.get("/forecast.json", {
      params: {
        q: location,
        days: days,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLocation(res.data.location.name);
        res.data.forecast.forecastday.map((day: any) => {
          console.log(day.date_epoch);
        });
        setForecast(
          res.data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            weekDay: getWeekday(day.date_epoch),
            location: res.data.location.name,
            highTemp: day.day.maxtemp_f,
            lowTemp: day.day.mintemp_f,
            windMPH: day.day.maxwind_mph,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });
  }, [location]);

  return (
    <div className="bg-sunny-morning-gradient text-center">
      <SearchBar onClick={(event) => setLocation(event)} />

      {!loading && <h5>{location}</h5>}
      {loading && (
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-3"></span>
        </h5>
      )}
      <div className="row ">
        {loading &&
          Array.from({ length: days }).map((index, i) => (
            <div className="col-md" key={i}>
              <LoadingCard />
            </div>
          ))}

        {forecast &&
          !loading &&
          forecast.map((day) => (
            <div className="col-md" key={day.date}>
              <WeatherCard
                weekDay={day.weekDay}
                location={day.location}
                highTemp={day.highTemp}
                lowTemp={day.lowTemp}
                windMPH={day.windMPH}
                condition={day.condition}
                icon={day.icon}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
