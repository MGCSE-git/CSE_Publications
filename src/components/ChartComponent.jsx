import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { year: "2017", citations: 100 },
  { year: "2018", citations: 250 },
  { year: "2019", citations: 292 },
  { year: "2020", citations: 617 },
  { year: "2021", citations: 1267 },
  { year: "2022", citations: 3102 },
  { year: "2023", citations: 2092 },
  { year: "2024", citations: 716 },
  { year: "2025", citations: 549 },
  { year: "2026", citations: 9 },
];

const colors = [
  "#003F5C",
  "#005B96",
  "#0077B6",
  "#0096C7",
  "#00B4D8",
  "#00BFA6",
  "#00A896",
  "#2A9D8F",
  "#52B788",
  "#74C69D",
];

function ChartComponent() {
  return (
    <div
      style={{
        width: "95%",
        height: "550px",
        margin: "30px auto",
        background: "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#005B96",
          marginBottom: "20px",
        }}
      >
        Year-wise Citations
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 5,
            left: 0,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            label={{
              value: "Year of Publication",
              position: "insideBottom",
              offset: -15,
              style: {
                fill: "#003F5C",
                fontSize: 16,
                fontWeight: "bold",
              },
            }}
          />

          <YAxis
            domain={[0, (dataMax) => dataMax + 300]}
            width={150}
            label={{
                value: "Number of Citations",
                angle: -90,
                position: "outsideRight",
                offset: 10,
                style: {
                fill: "#003F5C",
                fontSize: 16,
                fontWeight: "bold",
                },
            }}
            />

          <Tooltip />

          <Bar
            dataKey="citations"
            radius={[8, 8, 0, 0]}
          >
            <LabelList
              dataKey="citations"
              position="top"
              style={{
                fill: "#003F5C",
                fontWeight: "bold",
                fontSize: 12,
              }}
            />

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
