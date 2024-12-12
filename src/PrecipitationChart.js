import React from "react";
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

    const barChartData = {
        labels: days,
        datasets: [
            {
                label: "Осадки (%)",
                data: precipitation,
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
            <div className="chart-container">
                <Bar data={barChartData} options={options} />
            </div>
        </div>
    );
};

export default PrecipitationChart;
