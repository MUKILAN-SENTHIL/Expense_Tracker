import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarCharData } from "../../utils/helper";

const IncomeOverview = ({ transactions = [], onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setChartData(prepareIncomeBarCharData(transactions));
    } else {
      setChartData([]);
    }
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-medium text-gray-800">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          onClick={onAddIncome}
        >
          <LuPlus className="text-base" />
          Add Income
        </button>
      </div>
      <div className="mt-8">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
