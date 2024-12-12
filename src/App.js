import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import TemperatureChart from "./TemperatureChart";
import PrecipitationChart from "./PrecipitationChart";
import RegionTemperatureMap from "./RegionTemperatureMap";
import "./style.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/temperature">Температура</Link></li>
            <li><Link to="/precipitation">Осадки</Link></li>
            <li><Link to="/regions">Карта температуры</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temperature" element={<TemperatureChart />} />
          <Route path="/precipitation" element={<PrecipitationChart />} />
          <Route path="/regions" element={<RegionTemperatureMap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
