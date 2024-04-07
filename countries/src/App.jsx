import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({n, capital, area, languages, flag}) => {

  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(res => {
        setWeather(res.data)
      })
  },
  [])
  
  if (weather) {
    const
      {
        main: {
          temp: temp,
        },
        wind: {
          speed: wind
        },
        weather: [
          {
            icon: icon
          }
        ]
      } = weather
      
    return (
      <div>
        <h1>{n}</h1>
        <div>capital: {capital}</div>
        <div>area: {area}</div>

        <h3>Languages:</h3>
        <ul>
          {Object.values(languages).map((lang, index) => <li key={index}>{lang}</li>)}
        </ul>
        
        <img src={flag} alt={`Flag of ${n}`}/>

        <h3>Weather in {capital}</h3>
        <div>temperature: {temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"/>
        <div>wind: {wind} m/s</div>
      </div>
    )
  }
  
}

const Display = ({matches, handleClick}) => {
  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (matches.length > 1) {
    return matches.map(c => {
      return (
        <div key={c.name.official}>
          {c.name.common} <button id={c.name.official} onClick={handleClick}>show</button>
        </div>
      )
    })
  }
  else if (matches.length > 0) {
    const c = matches[0]
    return (
      <Country
        n={c.name.common}
        capital={c.capital[0]}
        area={c.area}
        languages={c.languages}
        flag={c.flags.png}
      />
    )
  }
  else {
    return <div>No countries matched the search.</div>
  }
}

const App = () => {

  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => {
        setCountries(res.data)
        setMatchingCountries(res.data)
      })
  },
  [])

  const handleSearch = (event) => {
    const s = event.target.value
    setSearch(s)
    setMatchingCountries(countries.filter(country => country.name.common.toLowerCase().includes(s)))
  }

  const handleShow = (event) => {
    const id = event.target.id
    setMatchingCountries(matchingCountries.filter(c => c.name.official === id))
  }

  return (
    <div>
      Find countries: <input type="text" value={search} onChange={handleSearch}/>
      <Display matches={matchingCountries} handleClick={handleShow} />
    </div>
  )
}

export default App