import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const mapped = data.map((item) => ({
      name: item?.source || "Uncategorized",
      amount: item?.amount || 0,
    }));
    setChartData(mapped);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium text-gray-800">Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalIncome.toLocaleString()}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
