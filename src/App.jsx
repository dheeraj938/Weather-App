import React, { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import axios from "axios";


 function App() {
  const[Search,setSearch]=useState("")
  const[loading,setloading]=useState(false)
  const[tempreture,setTempreture]=useState(null)
  const[humidity,setHumidity]=useState(null)
  const[windSpeed,setWindSpeed]=useState(null)
  const[cityName,setcityName]=useState("")
  const[weather,setWeather]=useState("01d")
  const API_KEY ="72941418780eaae73888f2ef1e7e2e10"
  const fecthweather=async()=>{
    if(!Search) return;
    setloading(true)
    try {
     const{data} =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Search}&appid=${API_KEY}&units=metric`);
     console.log(data)
     if(data.cod==200){
      setTempreture(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setcityName(data.name);
      setWeather(data.weather[0].icon);
     }

      
    } catch (error) {
      console.log(error);
      setcityName("city not found")
      setTempreture(null)
      setHumidity(null)
      setWindSpeed(null)
      setWeather("01d")
    }
    setloading(false)

  }
  return (
    <>
    <div className="bg">
<div  className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-black text-white">
  {/* Search bar and icone */}
  <div className="flex items-center bg-white rounded-full px-4 py-2  mb-6 w-80 shadow-lg">
    <input type="text" placeholder="Search" value={Search} onChange={(e)=>setSearch(e.target.value)}  spellCheck="false" className="flex-1 text-black  outline-none px-2" />
    <FaSearch  onClick={fecthweather} className="text-gray-500 cursor-pointer"/>
  </div>
  <div>
    {/* Weather icon */}
    <img src={`https://openweathermap.org/img/wn/${weather}@2x.png`}  className="w-20 h-20 mb-4"/>
    {/* Tempreture and City Name*/}
    <h1 className="text-4xl font-bold">{loading?"loading...":tempreture!==null?`${tempreture}°C`:"-"}</h1>
    <h2 className="text-2xl mt-2 font-semibold">{cityName ||"type to check tempreture"}</h2>
  </div>
  {/* Humidity and Wind Speed */}
  <div className=" w-full max-w-md mt-8 flex flex-col md:flex-row items-center justify-between md:items-start ">
    <div className="flex flex-col items-center ">
      <WiHumidity className="text-3xl"/>
      <span className="text-lg front-medium">{humidity!==null?`${humidity}%`:"--"}</span>
      <p className="text-sm">Humidity</p>
    </div>
    <div className="flex flex-col items-center">
      <WiStrongWind className="text-3xl"/>
      <span className="text-lg font-medium">{windSpeed!==null?`${windSpeed}km/h`:"--"}</span>
      <p className="text-sm">Wind Speed</p>
    </div>
  </div>

</div>
</div>
    </>
  )
}

export default App;