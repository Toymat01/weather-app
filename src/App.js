import {  useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] =useState([]);

 
    const api = {
       key:"25ccdb3f26b8176e94ac3cfa46b687d1",
       base:"https://api.openweathermap.org/data/2.5/"
    };
    const search = (e) =>{
      if(e.key === 'Enter'){
        e.preventDefault()
        fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then((res) => res.json())
        .then(data => {
          setData(data)
          setQuery('')
          console.log(data)

        })
        .catch(err => console.log(err))
      }
     
    }

    const dateBuilder = (d) =>{
      let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      let day = days[d.getDay()]
      let month = months[d.getMonth()]
      let date = d.getDate()
      let year = d.getFullYear()

      return `${day} ${date} ${month} ${year}`
    }

  return (
    <div className="App">

    <div className="weather">
      <form >
        <input
         type="text"
         placeholder="Searching..."
         value={query}
         onChange ={e => setQuery(e.target.value)}
         onKeyDown ={search}
         />
      </form>
      {typeof data.main != "undefined" ? (
          <div className="content">
            <div className="city">{data.name}, {data.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temp">{Math.floor (data.main.temp - 273)}°C</div>
            <div className="clouds" >
              <div>{data.weather[0].main}</div>
              <div className="cloud">{data.weather[0].description}</div>
              {/* <div>{data.wind.s}</div> */}
            </div>
        </div>

      ) : ('')}
      
    </div>
      
    </div>
  );
}

export default App;
