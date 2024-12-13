import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import weatherData from "./data";

// Регистрация всех необходимых компонентов
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PrecipitationChart = () => {
    const { days, precipitation } = weatherData;

    const [minPrecip, setMinPrecip] = useState(0); // Минимальное количество осадков
    const [maxPrecip, setMaxPrecip] = useState(100); // Максимальное количество осадков

    // Фильтрация осадков по диапазону
    const filterPrecipitation = (precipitation) => {
        return precipitation.filter(p => p >= minPrecip && p <= maxPrecip);
    };

    const filteredPrecipitation = filterPrecipitation(precipitation);

    const barChartData = {
        labels: days,
        datasets: [
            {
                label: "Осадки (%)",
                data: filteredPrecipitation,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Распределение осадков за неделю",
            },
        },
    };

    return (
        <div>
            <h2>Распределение осадков за неделю</h2>

            {/* Фильтр по осадкам */}
            <div>
                <label>Минимальные осадки: </label>
                <input 
                    type="number" 
                    value={minPrecip} 
                    onChange={(e) => setMinPrecip(Number(e.target.value))} 
                />
                <label>Максимальные осадки: </label>
                <input 
                    type="number" 
                    value={maxPrecip} 
                    onChange={(e) => setMaxPrecip(Number(e.target.value))} 
                />
            </div>

            <div className="chart-container">
                <Bar data={barChartData} options={options} />
            </div>
        </div>
    );
};

export default PrecipitationChart;
