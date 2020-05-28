import React, { useEffect, useState } from "react";
import GetLocation from "./GetLocation";

function Weather() {
  const [getData, setData] = useState(null);
  const [date, setDate] = useState(null);
  const [found, setFound] = useState(null);

  // generate new date
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const whatDate = `${dd}/${mm}/${yyyy}`;
    setDate(whatDate);
  }, []);

  // get location of user
  const promise = new Promise((resolve, reject) => {
    const [Lat, Lon] = GetLocation();
    if ((Lat !== null) & (Lon !== null)) {
      if (!found) {
        setFound("found");
      }
      resolve([Lat, Lon]);
    } else {
      reject("failed");
    }
  });
  //after getting location fetch data from weather api
  useEffect(() => {
    async function getWeather() {
      promise.then(async (data) => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=cc78ae511fefe366b76785c554992382`
          );
          const json = await res.json();

          if (getData === null) {
            setData(json);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
    getWeather();
  }, [found]);

  if (getData !== null) {
    return (
      <div className={"weather_display"}>
        <div className={"weather_top_area"}>
          {getData.weather[0].description}
          <img
            src={`http://openweathermap.org/img/w/${getData.weather[0].icon}.png`}
            alt={"#"}
          />
        </div>
        <div className={"weather_bottom_area"}>
          <div>
            {getData.name} <br />
            {date}
          </div>
          <div className={"weather_tempature"}>
            {Math.floor(getData.main.temp - 273.15)}&#176;
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default Weather;
