import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const RegionTemperatureMap = () => {
    const regions = ["Север", "Юг", "Восток", "Запад"];
    const initialTemperatures = [10, 25, 15, 20]; // Температура по регионам

    // Состояния для фильтрации
    const [minTemp, setMinTemp] = useState(0);  // Минимальная температура
    const [maxTemp, setMaxTemp] = useState(40); // Максимальная температура

    // Функция для фильтрации температур по диапазону
    const filterTemperatures = (temperatures) => {
        return temperatures.filter(temp => temp >= minTemp && temp <= maxTemp);
    };

    // Фильтрация температур
    const filteredTemperatures = filterTemperatures(initialTemperatures);

    // Настройки для графика
    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: "Температура по регионам",
        },
        xAxis: {
            categories: regions,
        },
        yAxis: {
            title: {
                text: "Температура (°C)",
            },
        },
        series: [
            {
                name: "Регион",
                data: filteredTemperatures,
            },
        ],
    };

    return (
        <div>
            <h2>Карта температуры по регионам</h2>

            {/* Фильтры для температур */}
            <div>
                <label>Минимальная температура: </label>
                <input
                    type="number"
                    value={minTemp}
                    onChange={(e) => setMinTemp(Number(e.target.value))}
                />
                <label>Максимальная температура: </label>
                <input
                    type="number"
                    value={maxTemp}
                    onChange={(e) => setMaxTemp(Number(e.target.value))}
                />
            </div>

            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default RegionTemperatureMap;
