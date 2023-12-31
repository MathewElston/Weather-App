import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import LoadingCard from "./components/LoadingCard";
import WeatherAPI from "./services/WeatherAPI";
import { CanceledError } from "axios";
import getWeekday from "./calendar/Weekdays";
import SearchBar from "./components/SearchBar";
import NewsAPI from "./services/NewsAPI";
import NewsCard from "./components/NewsCard";

interface Weather {
  date?: string;
  weekDay?: string;
  location: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
  windMPH: number;
  icon: string;
  sunrise?: string;
  sunset?: string;
}

interface News {
  title?: string;
  date?: string;
  author?: string;
  source?: string;
  content?: string;
  url?: string;
  urlImage: string;
}

const App = () => {
  const [forecast, setForecast] = useState<Weather[]>();
  const [location, setLocation] = useState("");
  const [days, setDays] = useState(3);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [article, setArticle] = useState<News[]>();
  const totalArticles = 5;

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
        res.data.forecast.forecastday.map((day: any) => {
          console.log(day.astro.sunrise);
          console.log(day.astro.sunset);
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
            sunrise: day.astro.sunrise,
            sunset: day.astro.sunset,
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

  useEffect(() => {
    NewsAPI.get("/everything", {
      params: {
        q: location,
      },
    })
      .then((res) => {
        console.log(res.data);
        setArticle(
          res.data.articles.slice(0, totalArticles).map((article: any) => ({
            title: article.title,
            date: article.publishedAt,
            author: article.author,
            source: article.source.name,
            content: article.description,
            url: article.url,
            urlImage: article.urlToImage,
          }))
        );
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, [location]);

  return (
    <div className="gradient-sunset text-center ">
      <div className="w-25">
        <SearchBar buttonLabel="Go" onClick={(event) => setLocation(event)} />
      </div>

      {!loading && <h1>{location}</h1>}
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
                sunrise={day.sunrise}
                sunset={day.sunset}
              />
            </div>
          ))}
          <h1>Local News</h1>
        {article &&
          !loading &&
          article.map((article) => (
            <div className="col-md" key={article.date}>
              <NewsCard
                title={article.title}
                date={article.date}
                author={article.author}
                source={article.source}
                content={article.content}
                url={article.url}
                urlImage={article.urlImage}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
