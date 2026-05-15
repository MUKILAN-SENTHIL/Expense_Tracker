import React, { useEffect, useState } from "react";
import { prepareExpenseBarCharData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(prepareExpenseBarCharData(data));
    }
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium text-gray-800">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
