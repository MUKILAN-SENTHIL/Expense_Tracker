import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineCharData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpensiveOverview = ({ transactions = [], onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setChartData(prepareExpenseLineCharData(transactions));
    } else {
      setChartData([]);
    }
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-medium text-gray-800">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-base" />
          Add Expense
        </button>
      </div>
      <div className="mt-8">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpensiveOverview;
