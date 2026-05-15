import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import ExpensiveOverview from "../../components/Expense/ExpensiveOverview";
import DeleteAlert from "../../components/DeleteAlert";
import toast from "react-hot-toast";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({ show: false, id: null });

  const fetchExpenses = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast.error("Could not load expense data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category?.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a valid number greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: category.trim(),
        amount: Number(amount),
        date,
        icon: icon || "💸",
      });
      setOpenAddModal(false);
      toast.success("Expense added successfully.");
      fetchExpenses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!id) return;
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setDeleteAlert({ show: false, id: null });
      toast.success("Expense deleted successfully.");
      fetchExpenses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete expense.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "expense_details.xlsx";
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download complete.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download expense data.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpensiveOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setDeleteAlert({ show: true, id })}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={openAddModal}
          onclose={() => setOpenAddModal(false)}
          title="Add New Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={deleteAlert.show}
          onclose={() => setDeleteAlert({ show: false, id: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record? This action cannot be undone."
            onDelete={() => handleDeleteExpense(deleteAlert.id)}
            onCancel={() => setDeleteAlert({ show: false, id: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
