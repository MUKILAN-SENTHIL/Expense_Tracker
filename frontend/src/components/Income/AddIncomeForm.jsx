import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "💰",
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) return;
    onAddIncome(income);
  };

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="0.00"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
