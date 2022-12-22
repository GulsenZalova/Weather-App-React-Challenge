import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [locationData, setLocationData] = useState()
  const [currentData, setcurrentData] = useState()
  const[isLoading,setİsloading]=useState(false)
  const [searchData,setSearchData]=useState("London")
  const [inputSearch,setİnputSearch]=useState("")
  const getAll = () => {
    setİsloading(true)
    fetch(`http://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${searchData}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        setLocationData(data.location)
        setcurrentData(data.current)
        setİsloading(false)
      })
  }
 const changeforSearch=()=>{
    setSearchData(inputSearch)
 }
  useEffect(() => {
    getAll()
    console.log(locationData)
    console.log(currentData)
  }, [searchData])


  return (
    <div className='container'>

       {
        isLoading ?(
          <div class="loader"></div>
        ):
          (
                 
        <div className='wheatherApp'>
        <div className='searchArea'>
        <header>
          <input type="text" 
          onChange={(e)=>setİnputSearch(e.target.value)}
          />
          <button onClick={changeforSearch}>Get ForeCast</button>
        </header>


        {locationData && currentData && (
          <div className='wheaterInfo'>
            <div className='wheatherInfo-top'>
              <div className='wheaterCountry'>{locationData.name}</div>
              <img src={currentData.condition.icon} alt="" />
              <div>{currentData.condition.text} Clouds</div>
              <div className='tepm'>{currentData.temp_c}</div>
              <div className='tepm'>{currentData.temp_f}</div>
            </div>
            <div className='wheatherInfo-bottom'>
              <span>Wind {currentData.wind_degree}MPH</span>
              <span>Visibility {currentData.vis_km} M</span>
            </div>
          </div>
        )||(
          <div className='error'><h1>Data Not Found</h1></div>
        )
        }
      </div>
        </div>
          )
        }
    </div>

  )
}

export default App


