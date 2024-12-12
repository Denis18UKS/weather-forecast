import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const PrecipitationPieChart = ({ precipitation, days }) => {
    const svgRef = useRef();
    const [hoverData, setHoverData] = useState(null); // Стейт для данных, которые будут отображаться при наведении

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

        const pie = d3.pie().value(d => d)(precipitation);

        const arc = d3.arc().innerRadius(50).outerRadius(radius);
        const arcHover = d3.arc().innerRadius(50).outerRadius(radius + 10); // Увеличенный радиус при наведении

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
            .attr("stroke-width", 2)
            .attr("opacity", 1);

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
                // Увеличить выделенный сегмент
                d3.select(this).select("path").transition().duration(200).attr("d", arcHover);

                // Уменьшить видимость остальных сегментов
                slices
                    .transition()
                    .duration(200)
                    .attr("opacity", p => (p === d ? 1 : 0.3));

                // Обновить данные, которые показываются
                setHoverData({ day: days[d.index], value: d.data });
            })
            .on("mouseout", function () {
                // Вернуть всё в исходное состояние
                d3.select(this).select("path").transition().duration(200).attr("d", arc);
                slices.transition().duration(200).attr("opacity", 1);

                // Сбросить данные при уходе с элемента
                setHoverData(null);
            });

    }, [precipitation, days]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Распределение осадков за неделю</h2>
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
