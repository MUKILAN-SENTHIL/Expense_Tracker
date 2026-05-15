import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium text-gray-800">Expenses</h5>
        <button
          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-2">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No expenses recorded.</p>
        ) : (
          transactions.slice(0, 4).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
