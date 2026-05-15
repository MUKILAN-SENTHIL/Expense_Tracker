import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer, // Fixed typo here
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbeef"; // Fixed hex code
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category ||
              payload[0].payload.source ||
              payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={
            Array.isArray(data)
              ? data.map((item) => ({
                  month: item.month || item.category || "Unknown",
                  amount: Number(item.amount) || 0,
                }))
              : []
          }
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={30}>
            {Array.isArray(data) &&
              data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
