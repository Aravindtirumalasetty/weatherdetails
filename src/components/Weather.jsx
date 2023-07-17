import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

import hotbg from "../assets/hotbg.jpg";
import coldbg from "../assets/cold.jpg";
import rainy from "../assets/rainy.jpg"
import styles from "../components/Weather.module.css";
import { getWeatherdata } from "./WeatherService";
const Weather = () => {

  const [params, setParams] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("paris");
  const [bg,setBg]=useState(hotbg)

  useEffect(() => {
    const fetchWeatherdata = async () => {
      const data = await getWeatherdata(city, units);

      setParams(data);
      const threshold=units==='metric'?25:45;
      if(data.temp<=threshold)setBg(coldbg);
      else if(data.description.includes("rain")|data.description.includes("clouds"))setBg(rainy);
      else setBg(hotbg);
    };
    fetchWeatherdata();
  }, [units, city]);
  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentunit = button.innerText.slice(1);
    const isCel = currentunit === "C";
    button.innerText = isCel ? "°F" : "°C";
    setUnits(isCel ? "metric" : "imperial");
  };

  const enterkey = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <>
    <div className={`${styles.main}`}>

   
      {params && (
        <div className={`${styles.weathercontainer}`} style={{backgroundImage:`url(${bg})`}}>
          <div className={`${styles.searchbar}`}>
            <input
              type="text"
              name="city"
              onKeyDown={enterkey}
              placeholder="Enter city...."
              className={`${styles.input}`}
            />
            <button
              onClick={(e) => handleClick(e)}
              className={`${styles.toggle}`}
            >
              °F
            </button>
          </div>
          <div className={`${styles.temperaturebox}`}>
            <div className={`${styles.leftpart}`}>
              <h3>{`${params.name},${params.country}`}</h3>
              <img src={params.iconURL} alt="weathericon" />
              <h3>{params.description}</h3>
            </div>
            <div className={`${styles.rightpart}`}>
              <h1>{`${params.temp.toFixed()} °${
                units === "metric" ? "C" : "F"
              }`}</h1>
            </div>
          </div>
          <div className={`${styles.parameters}`}>
            <div className={`${styles.leftparams}`}>
              <div className={`${styles.parambox}`}>
                <div className={`${styles.paramsdetails}`}>
                  <FaArrowDown />
                  <small> min_temp</small>
                </div>
                <h2>{`${params.temp_min.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h2>
              </div>
              <div className={`${styles.parambox}`}>
                <div className={`${styles.params}`}>
                  <BiHappy />
                  <small> feels-like</small>
                </div>
                <h3>{`${params.feels_like.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h3>
              </div>
              <div className={`${styles.parambox}`}>
                <div className={`${styles.params}`}>
                  <FaWind />
                  <small> speed</small>
                </div>
                <h2>{`${params.speed} ${
                  units === "metric" ? "m/s" : "m/hr"
                }`}</h2>
              </div>
            </div>
            <div className={`${styles.rightparams}`}>
              <div className={`${styles.parambox}`}>
                <div className={`${styles.params}`}>
                  <FaArrowUp />
                  <small> max_temp</small>
                </div>
                <h2>{`${params.temp_max.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h2>
              </div>
              <div className={`${styles.parambox}`}>
                <div className={`${styles.params}`}>
                  <MdCompress />
                  <small> Pressure</small>
                </div>
                <h2>{params.pressure} hPa</h2>
              </div>

              <div className={`${styles.parambox}`}>
                <div className={`${styles.params}`}>
                  <MdOutlineWaterDrop />
                  <small> humidity</small>
                </div>
                <h2>{params.humidity}%</h2>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Weather;
