import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import TemperatureChart from "./TemperatureChart";
import PrecipitationChart from "./PrecipitationChart";
import PrecipitationPieChart from "./PrecipitationPieChart"; // Импорт компонента
import RegionTemperatureMap from "./RegionTemperatureMap";
import weatherData from "./data"; // Импорт данных
import "./style.css";

const App = () => {
  const { days, precipitation } = weatherData;

  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/temperature">Температура</Link></li>
            <li><Link to="/precipitation">Осадки</Link></li>
            <li><Link to="/precipitation-pie">Круговая диаграмма осадков</Link></li>
            <li><Link to="/regions">Карта температуры</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temperature" element={<TemperatureChart />} />
          <Route path="/precipitation" element={<PrecipitationChart />} />
          <Route
            path="/precipitation-pie"
            element={<PrecipitationPieChart days={days} precipitation={precipitation} />} // Передача данных через props
          />
          <Route path="/regions" element={<RegionTemperatureMap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
