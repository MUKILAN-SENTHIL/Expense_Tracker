import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import IncomeOverview from "../../components/Income/IncomeOverview";
import DeleteAlert from "../../components/DeleteAlert";
import toast from "react-hot-toast";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({ show: false, id: null });

  const fetchIncome = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      console.error("Failed to fetch income:", error);
      toast.error("Could not load income data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source?.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a valid number greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon: icon || "💰",
      });
      setOpenAddModal(false);
      toast.success("Income added successfully.");
      fetchIncome();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income.");
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!id) return;
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setDeleteAlert({ show: false, id: null });
      toast.success("Income deleted successfully.");
      fetchIncome();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "income_details.xlsx";
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download complete.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download income data.");
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddModal(true)}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setDeleteAlert({ show: true, id })}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={openAddModal}
          onclose={() => setOpenAddModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={deleteAlert.show}
          onclose={() => setDeleteAlert({ show: false, id: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record? This action cannot be undone."
            onDelete={() => handleDeleteIncome(deleteAlert.id)}
            onCancel={() => setDeleteAlert({ show: false, id: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
