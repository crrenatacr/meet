import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const EventGenresChart = ({ events }) => {
  console.log("events:", events);
  const [data, setData] = useState([]);
  console.log("data (state):", data);
  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  console.log("genres:", genres);
  const colors = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      console.log("filteredEvents for genre", genre, ":", filteredEvents);
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    console.log("data (from getData):", data);
    return data;
  };

  useEffect(() => {
		setData(getData());
	}, [`${events}`]);

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle,
    outerRadius,
    percent,
    index
  }) => {
    console.log("renderCustomizedLabel params:", { cx, cy, midAngle, outerRadius, percent, index });
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    console.log("x:", x, "y:", y);
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}  
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend
					align="center"
					verticalAlign="bottom"
					layout="vertical"
					height={2}
				/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
