import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const RegionTemperatureMap = () => {
    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: "Температура по регионам",
        },
        xAxis: {
            categories: ["Север", "Юг", "Восток", "Запад"],
        },
        yAxis: {
            title: {
                text: "Температура (°C)",
            },
        },
        series: [
            {
                name: "Регион",
                data: [10, 25, 15, 20],
            },
        ],
    };

    return (
        <div>
            <h2>Карта температуры по регионам</h2>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default RegionTemperatureMap;
