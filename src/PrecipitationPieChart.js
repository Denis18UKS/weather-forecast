import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const PrecipitationPieChart = ({ precipitation, days }) => {
    const svgRef = useRef();
    const [hoverData, setHoverData] = useState(null); // Стейт для данных, которые будут отображаться при наведении

    // Добавление состояния для фильтрации осадков
    const [minPrecipitation, setMinPrecipitation] = useState(0);  // Минимальное значение осадков
    const [maxPrecipitation, setMaxPrecipitation] = useState(100); // Максимальное значение осадков

    // Функция фильтрации осадков по диапазону
    const filterPrecipitation = (precipitation) => {
        return precipitation.filter(value => value >= minPrecipitation && value <= maxPrecipitation);
    };

    // Отфильтрованные данные осадков
    const filteredPrecipitation = filterPrecipitation(precipitation);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Очистка перед рендером

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const colorScale = d3
            .scaleOrdinal()
            .domain(days)
            .range(d3.schemeTableau10);

        const pie = d3.pie().value(d => d)(filteredPrecipitation);

        const arc = d3.arc().innerRadius(50).outerRadius(radius);

        // Создание группы для диаграммы
        const chartGroup = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Добавление групп для сегментов и текста
        const slices = chartGroup
            .selectAll("g")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");

        // Добавление сегментов
        slices
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => colorScale(days[i]))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        // Добавление текста (названия дней и процентов)
        slices
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("fill", "black")
            .text((d, i) => `${days[i]}: ${d.data}%`);

        // Добавление событий наведения
        slices
            .on("mouseover", function (event, d) {
                // При наведении на сегмент выделяем его, не делая анимации
                d3.select(this).select("path").attr("stroke", "black").attr("stroke-width", 3);

                // Обновить данные, которые показываются
                setHoverData({ day: days[d.index], value: d.data });
            })
            .on("mouseout", function () {
                // Возврат к исходному состоянию (без анимации)
                d3.select(this).select("path").attr("stroke", "white").attr("stroke-width", 2);

                // Сбросить данные при уходе с элемента
                setHoverData(null);
            });
    }, [filteredPrecipitation, days]); // Отслеживаем изменения в фильтрованных данных

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Распределение осадков за неделю</h2>
            
            {/* Фильтры для осадков */}
            <div>
                <label>Минимальные осадки (%): </label>
                <input
                    type="number"
                    value={minPrecipitation}
                    onChange={(e) => setMinPrecipitation(Number(e.target.value))}
                />
                <label>Максимальные осадки (%): </label>
                <input
                    type="number"
                    value={maxPrecipitation}
                    onChange={(e) => setMaxPrecipitation(Number(e.target.value))}
                />
            </div>

            <svg ref={svgRef}></svg>
            
            {hoverData && (
                <div style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}>
                    <p>День: {hoverData.day}</p>
                    <p>Осадки: {hoverData.value}%</p>
                </div>
            )}
        </div>
    );
};

export default PrecipitationPieChart;
