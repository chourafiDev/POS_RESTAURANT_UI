"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "11:00am",
    sales: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "12:00am",
    sales: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "1:00am",
    sales: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2:00am",
    sales: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "3:00am",
    sales: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "4:00am",
    sales: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "5:00am",
    sales: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "6:00am",
    sales: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Sales = () => {
  return (
    <div className="bg-white rounded-xl w-4/6 p-5">
      <h2 className="text-dark font-semibold">Daily Sales</h2>
      <ResponsiveContainer aspect={2.4}>
        <AreaChart
          width={200}
          height={400}
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 13, fontWeight: 500, fill: "#a0a0a0" }}
          />
          <YAxis tick={{ fontSize: 13, fontWeight: 500, fill: "#a0a0a0" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#46A094"
            fill="#AECFA4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sales;
