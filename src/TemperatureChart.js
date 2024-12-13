import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import weatherData from "./data";

// Регистрация всех необходимых компонентов
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TemperatureChart = () => {
    const { days, hourlyTemperatures } = weatherData;

    // Функция для вычисления средней температуры за день
    const calculateDailyAverages = (hourlyTemperatures) => {
        const dailyAverages = [];
        for (let i = 0; i < hourlyTemperatures.length; i += 24) {
            const dailyData = hourlyTemperatures.slice(i, i + 24);
            const dailyAverage = dailyData.reduce((acc, temp) => acc + temp, 0) / dailyData.length;
            dailyAverages.push(dailyAverage);
        }
        return dailyAverages;
    };

    // Вычисление средней температуры для каждого дня
    const dailyTemperatures = calculateDailyAverages(hourlyTemperatures);

    const hourlyChartRef = useRef(null);
    const dailyChartRef = useRef(null);

    const hourlyChartData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: "Температура (°C) по часам",
                data: hourlyTemperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const dailyChartData = {
        labels: days,
        datasets: [
            {
                label: "Средняя температура (°C)",
                data: dailyTemperatures,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.3,
                fill: true,
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
                text: "Температура",
            },
        },
    };

    useEffect(() => {
        return () => {
            // Уничтожение экземпляров Chart при размонтировании компонента
            if (hourlyChartRef.current) {
                hourlyChartRef.current.destroy();
            }
            if (dailyChartRef.current) {
                dailyChartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h2>График температуры</h2>
            <div className="chart-container">
                <h3>По часам</h3>
                <Line
                    ref={chart => {
                        if (chart) {
                            hourlyChartRef.current = chart.chart;
                        }
                    }}
                    data={hourlyChartData}
                    options={options}
                />
            </div>
            <div className="chart-container">
                <h3>По дням</h3>
                <Line
                    ref={chart => {
                        if (chart) {
                            dailyChartRef.current = chart.chart;
                        }
                    }}
                    data={dailyChartData}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TemperatureChart;
