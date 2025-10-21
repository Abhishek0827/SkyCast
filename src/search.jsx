import MainWeather from "./Forcast.jsx";
import { useState, useEffect } from "react";
import { API, API_key } from "./api.js";
export default function Search() {
  let [symbol, setSymbols] = useState("");
  let [city, setCity] = useState({
    liveLocation: "",
    searchLocation: "",
    selectedLocation: "",
  });
  let [result, setResult] = useState({
    resultType: "",
    place: "",
    temperature: "",
    humidity: "",
    weather: "",
  });
  function icon(weather) {
    switch (weather) {
      case "Rain":
        setSymbols("rain.png");
        break;
      case "Clouds":
        setSymbols("cloudy.png");
        break;
      case "Haze":
        setSymbols("haze.png");
        break;
      case "Mist":
        setSymbols("Mist.png");
        break;
      default:
        setSymbols("sun.png");
        break;
    }
  }

  //++++++++++++++++Search+++++++++++++++++++++++++++
  async function findData() {
    await fetch(`${API}?q=${city.searchLocation}&appid=${API_key}&units=metric`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data);

        setResult({
          resultType: "Searched Forcast",
          place: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          weather: data.weather[0].main,
        });
        icon(data.weather[0].main);
      });
  }
  function handleChange(evt) {
    setCity({
      liveLocation: "",
      searchLocation: evt.target.value,
      selectedLocation: "",
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    findData();

    setCity({ liveLocation: "", searchLocation: "" });
  }

  //++++++++++++++++Live+++++++++++++++++++++++++++
  async function findLiveLocation(location) {
    if (!location) {
      console.log("No live location available");
      return;
    }

    try {
      const response = await fetch(
        `${API}?q=${location}&appid=${API_key}&units=metric`
      );
      const data = await response.json();
      setResult({
        resultType: "Live Location Forcast",
        place: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        weather: data.weather[0].main,
      });
      icon(data.weather[0].main);
    } catch (error) {
      console.log("API call failed", error);
    }
  }

  // new way
  useEffect(() => {
    async function showLocation(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_key}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCity({
            liveLocation: data[0].state,
            searchLocation: "",
            selectedLocation: "",
          });
          findLiveLocation(data[0].name);
          // console.log("No location data found");
        }
      } catch (error) {
        console.log("Reverse geocoding failed", error);
      }
      // console.log("latitude", latitude, "\nlongitude", longitude);
      setSymbols("sun.png");
    }

    function showError(error) {
      alert("Error: " + error.message);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  //++++++++++++++++Map+++++++++++++++++++++++++++
  async function findMapData() {
    await fetch(
      `${API}?q=${city.selectedLocation}&appid=${API_key}&units=metric`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setResult({
          resultType: "Map Selected Forcast",
          place: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          weather: data.weather[0].main,
        });
        icon(data.weather[0].main);
      });
  }
  async function mapClk(event) {
    setCity({
      liveLocation: "",
      searchLocation: "",
      selectedLocation: event.target.id,
    });
    await findMapData();
  }
  //++++++++++++++++Map+++++++++++++++++++++++++++
  return (
    <div>
      <header>
        <div id="logo">
          <a href="">SkyCast</a>
        </div>
        <form onSubmit={handleSubmit} id="searchForm">
          <input
            placeholder="Search"
            type="text"
            value={city.searchLocation}
            onChange={handleChange}
            id="searchInput"
          />
          <button type="submit">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#000000" }}
            ></i>
          </button>
        </form>
      </header>

      <section>
        <MainWeather
          resultType={result.resultType}
          place={result.place}
          temperature={result.temperature}
          humidity={result.humidity}
          weather={result.weather}
          symbol={symbol}
        />
      </section>

      <div id="mapSection">
        <div className="mapLayer" id="contryMap">
          <img src="Map.png" alt="Map" />
        </div>
        <div className="mapLayer" id="mapName">
          <div className="statename up" id="Uttar pradesh" onClick={mapClk}>
            Uttar Pradesh
          </div>
          <div className="statename bihar" id="bihar" onClick={mapClk}>
            Bihar
          </div>
          <div className="statename uk" id="Uttarakhand" onClick={mapClk}>
            Uttarakhand
          </div>
          <div className="statename hp" id="Himachal Pradesh" onClick={mapClk}>
            Himachal Pradesh
          </div>
          <div className="statename haryana" id="Haryana" onClick={mapClk}>
            Haryana
          </div>
          <div className="statename punjab" id="Punjab" onClick={mapClk}>
            Punjab
          </div>
          <div className="statename rajasthan" id="Rajasthan" onClick={mapClk}>
            Rajasthan
          </div>
          <div className="statename gujarat" id="Gujarat" onClick={mapClk}>
            Gujarat
          </div>
          <div className="statename delhi" id="Delhi" onClick={mapClk}>
            Delhi
          </div>
          <div className="statename jharkhand" id="Jharkhand" onClick={mapClk}>
            Jharkhand
          </div>
          <div className="statename mp" id="Madhya Pradesh" onClick={mapClk}>
            Madhya Pradesh
          </div>
          <div
            className="statename maharashtra"
            id="Maharashtra"
            onClick={mapClk}
          >
            Maharashtra
          </div>
          <div
            className="statename chhattisgarh"
            id="Chhattisgarh"
            onClick={mapClk}
          >
            Chhattisgarh
          </div>
          <div className="statename telangana" id="Telangana" onClick={mapClk}>
            Telangana
          </div>
          <div className="statename odisha" id="Odisha" onClick={mapClk}>
            Odisha
          </div>
          <div className="statename wb" id="West Bengal" onClick={mapClk}>
            West Bengal
          </div>
          <div className="statename karnataka" id="Karnataka" onClick={mapClk}>
            Karnataka
          </div>
          <div className="statename ap" id="Andhra Pradesh" onClick={mapClk}>
            Andhra Pradesh
          </div>
          <div className="statename tn" id="Tamil Nadu" onClick={mapClk}>
            Tamil Nadu
          </div>
          <div className="statename kerala" id="Kerala" onClick={mapClk}>
            Kerala
          </div>
          <div className="statename sikkim" id="Sikkim" onClick={mapClk}>
            Sikkim
          </div>
          <div className="statename assam" id="Assam" onClick={mapClk}>
            Assam
          </div>
          <div className="statename meghalaya" id="Meghalaya" onClick={mapClk}>
            Meghalaya
          </div>
          <div
            className="statename arunachal"
            id="Arunachal Pradesh"
            onClick={mapClk}
          >
            Arunachal
          </div>
          <div className="statename nagaland" id="Nagaland" onClick={mapClk}>
            Nagaland
          </div>
          <div className="statename manipur" id="Manipur" onClick={mapClk}>
            Manipur
          </div>
          <div className="statename mizoram" id="Mizoram" onClick={mapClk}>
            Mizoram
          </div>
          <div className="statename tripura" id="Tripura" onClick={mapClk}>
            Tripura
          </div>
          <div className="statename jammu" id="Jammu" onClick={mapClk}>
            Jammu
          </div>
          <div className="statename goa" id="Goa" onClick={mapClk}>
            Goa
          </div>
          <div
            className="statename lakshadweep"
            id="Lakshadweep"
            onClick={mapClk}
          >
            Lakshadweep
          </div>
          <div
            className="statename aan"
            id="Andaman and Nicobar Islands"
            onClick={mapClk}
          >
            Andaman and Nicobar Islands
          </div>
          <div className="statename kashmir" id="Kashmir" onClick={mapClk}>
            Kashmir
          </div>
        </div>
      </div>
    </div>
  );
}
