import moment from "moment";

export const validateEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  const words = name.trim().split(/\s+/);
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i][0]) initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "0";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart ? `${formatted}.${fractionalPart}` : formatted;
};

export const prepareExpenseBarCharData = (data = []) => {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    category: item?.category || "Uncategorized",
    amount: item?.amount || 0,
  }));
};

export const prepareIncomeBarCharData = (data = []) => {
  if (!Array.isArray(data)) return [];
  return [...data]
    .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
    .map((item) => ({
      month: item?.date ? moment(item.date).format("DD MMM") : "N/A",
      amount: item?.amount || 0,
      source: item?.source || "Unknown",
    }));
};

export const prepareExpenseLineCharData = (data = []) => {
  if (!Array.isArray(data)) return [];
  return [...data]
    .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
    .map((item) => ({
      month: item?.date ? moment(item.date).format("Do MMM") : "N/A",
      amount: item?.amount || 0,
      category: item?.category || "Uncategorized",
    }));
};
