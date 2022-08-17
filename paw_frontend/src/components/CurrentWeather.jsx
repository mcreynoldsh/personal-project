import React, { useState, useEffect } from 'react'

function CurrentWeather(props) {
  const [temp, setTemp] = useState(null)
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState(null)
  const myOpenWeatherApiKey = "a38762d3a90b8970956657273fead807"

  const getTemp = async () => {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${props.user.zip_code},us&appid=${myOpenWeatherApiKey}`)

      if (response.ok) {
        let data = await response.json()
        if (data) {
          let celcTemp = data.main.temp - 273.15
          let fahrTemp = Math.round((celcTemp * 9 / 5) + 32)
          setTemp(`${fahrTemp}°F`)
          setCity(data.name)
          setWeather(data.weather[0].description)
        }
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getTemp()
  }, [])

  return (
    <div>
      {temp && weather && city && <div className='text-center border-div'>
        <h5>Weather for today's walks in {city}</h5>
        <h5>{temp} with {weather}</h5>
      </div>}
    </div>
  )
}

export default CurrentWeather