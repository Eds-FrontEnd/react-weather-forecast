import { useState, useRef } from 'react';
import axios from 'axios';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import './App.css';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days';

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [loading, setLoading] = useState(false); // Novo estado para controlar o carregamento
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();

    if (!city) {
      alert("Ops, tente novamente...");
      return;
    }

    const key = ""; // Acessar o site https://home.openweathermap.org/ realizar o cadastro e ir na opção My API Keys e pegar a chave, copiar e colar dentro de aspas
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      setLoading(true); // Inicia o carregamento
      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      if (!apiInfo.data || !apiInfo5Days.data) {
        alert("Ops, tente novamente...");
        return;
      }

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
      inputRef.current.value = '';
      
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      inputRef.current.value = '';
      alert("Digite novamente...");
    } finally {
      setLoading(false); 
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchCity();
    }
  };

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Digite o nome da cidade..." 
        onKeyPress={handleKeyPress}
      />
      <button onClick={searchCity}>Pesquisar</button>
      
      {loading ? (
        <div className="spinner"></div> // Mostra a animação de carregamento
      ) : (
        <>
          {weather && <WeatherInformations weather={weather} />}
          {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
        </>
      )}
    </div>
  );
}

export default App;
