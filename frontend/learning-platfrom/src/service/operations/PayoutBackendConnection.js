import Apiconnection from "../Apiconnection";
import { PAYOUT_API } from "../Api";
import { toast } from "react-hot-toast";

export const getEarningsSummary = async (token) => {
  try {
    const response = await Apiconnection(
      "GET",
      PAYOUT_API.GET_SUMMARY,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching earnings summary:", error);
  }
  return null;
};

export const updatePayoutDetails = async (token, details) => {
  const toastId = toast.loading("Updating payment details...");
  try {
    const response = await Apiconnection(
      "POST",
      PAYOUT_API.UPDATE_DETAILS,
      details,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      toast.success("Payment details updated successfully");
      return response.data.data;
    }
  } catch (error) {
    console.error("Error updating payout details:", error);
    toast.error(error.response?.data?.message || "Failed to update payout details");
  } finally {
    toast.dismiss(toastId);
  }
  return null;
};

export const requestWithdrawal = async (token, amount) => {
  const toastId = toast.loading("Submitting withdrawal request...");
  try {
    const response = await Apiconnection(
      "POST",
      PAYOUT_API.REQUEST_WITHDRAWAL,
      { amount },
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      toast.success("Withdrawal request sent to Admin for approval");
      return response.data.data;
    }
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    toast.error(error.response?.data?.message || "Failed to request withdrawal");
  } finally {
    toast.dismiss(toastId);
  }
  return null;
};

export const getPayoutHistory = async (token) => {
  try {
    const response = await Apiconnection(
      "GET",
      PAYOUT_API.GET_HISTORY,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching payout history:", error);
  }
  return [];
};
