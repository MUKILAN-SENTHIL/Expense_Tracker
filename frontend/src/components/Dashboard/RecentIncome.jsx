import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium text-gray-800">Income</h5>
        <button
          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          onClick={onSeeMore}
        >
          See All <LuArrowRight />
        </button>
      </div>

      <div className="mt-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No income records yet.</p>
        ) : (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
