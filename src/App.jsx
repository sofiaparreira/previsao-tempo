import { useEffect, useState } from "react";
import "./App.css";
import CardPrevisao from "./components/CardPrevisao";

function App() {
  const [searchedCity, setSearchedCity] = useState("Belo Horizonte");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    async function getCityWeather() {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=7463518898ff4694825160735241908&q=${searchedCity}&days=3&aqi=no`
        );
        const data = await response.json();
        setWeather(data.current);
        setForecast(data.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    getCityWeather();
  }, [city]);

  function handleSubmit(event) {
    event.preventDefault();
    setCity(searchedCity);
  }

  // Função para obter o nome do dia da semana
  function getDayOfWeek(index) {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <div className="bg-gradient-to-b from-slate-600 to-sky-600 h-screen py-8 text-white">
      <form className="grid grid-cols-5 gap-8 mx-64" onSubmit={handleSubmit}>
        <input
          type="text"
          className="col-span-4 bg-gray-700 rounded-lg px-8 py-2 text-white"
          placeholder="Exemplo: Belo Horizonte"
          onChange={(event) => setSearchedCity(event.target.value)}
        />
        <button
          type="submit"
          className="col-span-1 rounded-lg text-white bg-sky-800"
        >
          Pesquisar Cidade
        </button>
      </form>

      {city && weather && forecast && (
        <div className="mt-32">
          <h1 className="text-center text-5xl font-semibold">{city}</h1>

          <div className="mt-16 mb-32">
            <h2 className="text-center text-3xl font-thin">Tempo Atual</h2>
            <p className="text-center text-6xl pt-24 pb-8">{Math.round(weather.temp_c)} °C</p>
            <p className="text-center text-3xl">{weather.condition.text}</p>
          </div>

          <div className="flex justify-around mt-16">
            {forecast.length > 0 && (
              <div className="w-full flex flex-col gap-4">
                {forecast[1] && forecast[1].day && (
                  <CardPrevisao
                    date={"Amanhã"}
                    temperature={forecast[1].day.avgtemp_c} 
                    km={""}
                  />
                )}
                {forecast[2] && forecast[2].day && (
                  <CardPrevisao
                    date={getDayOfWeek(2)} // Calcula o dia da semana para depois de amanhã
                    temperature={forecast[2].day.avgtemp_c} 
                    km={""}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
