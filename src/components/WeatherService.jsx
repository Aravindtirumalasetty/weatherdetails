const API_KEY = "1e773c73bc6d0b5fdd40fbdaeddf8b9c";

const makeIconURL=(iconId)=>`http://openweathermap.org/img/wn/${iconId}@2x.png`;


export const getWeatherdata = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&&units=${units}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
    console.log(data);
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    iconURL:makeIconURL(icon),
    temp,
    feels_like,
    temp_max,
    temp_min,
    pressure,
    name,
    speed,
    humidity,
    country,
  };
};
