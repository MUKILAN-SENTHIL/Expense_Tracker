import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium text-gray-800">Income Sources</h5>
        <button
          className="flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          onClick={onDownload}
        >
          <LuDownload className="text-base" />
          Download Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 col-span-2 text-center py-8">
            No income records yet.
          </p>
        ) : (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default IncomeList;
