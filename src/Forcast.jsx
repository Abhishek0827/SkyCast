export default function MainWeather({resultType, place, temperature, humidity, weather,symbol}) {
  return (
    <>
      <div className="Forcast">
        <h1>{resultType}</h1>
        <div>
          <div>
            <h1>Place : {place}</h1>
            <h2>Temperature : {temperature}</h2>
            <h2>Humidity : {humidity}</h2>
            <h2>Weather : {weather}</h2>
          </div>
          <div className="symbols">
            <img src={`public/${symbol}`} alt="src/assets/sun.png" id="SearchForcastIcon" />
           
          </div>
        </div>
      </div>
    </>
  );
}
