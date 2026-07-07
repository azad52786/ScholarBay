import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEarningsSummary, getPayoutHistory, requestWithdrawal, updatePayoutDetails } from "../../service/operations/PayoutBackendConnection";
import { RiWallet3Line, RiBankCardLine, RiHistoryLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

const FinanceDashboard = () => {
  const { token } = useSelector((store) => store.Auth);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [bankDetails, setBankDetails] = useState({
    bankAccount: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: ""
  });
  const [editingDetails, setEditingDetails] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [summaryRes, historyRes] = await Promise.all([
      getEarningsSummary(token),
      getPayoutHistory(token)
    ]);
    if (summaryRes) {
      setSummary(summaryRes);
      setBankDetails(summaryRes.payoutDetails || {
        bankAccount: "",
        ifscCode: "",
        accountHolderName: "",
        upiId: ""
      });
    }
    setHistory(historyRes || []);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    const updated = await updatePayoutDetails(token, bankDetails);
    if (updated) {
      setSummary(updated);
      setEditingDetails(false);
    }
  };

  const handleWithdrawRequest = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amountNum > summary.currentBalance) {
      toast.error("Requested amount exceeds withdrawable balance");
      return;
    }

    const updatedRequest = await requestWithdrawal(token, amountNum);
    if (updatedRequest) {
      setWithdrawAmount("");
      setShowWithdrawModal(false);
      loadData(); // Refresh summary and history
    }
  };

  if (loading && !summary) {
    return (
      <div className="flex-1 flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-25"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8 font-inter text-richblack-25 bg-richblack-900 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-richblack-700 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-richblack-5">Earnings & Payouts</h1>
            <p className="text-sm text-richblack-300 mt-1">Manage your revenues, configure bank transfers, and request payouts.</p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="px-6 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-lg transition duration-200 shadow-md hover:scale-102"
            disabled={!summary || summary.currentBalance <= 0}
          >
            Withdraw Funds
          </button>
        </div>

        {/* Top summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Withdrawable Balance */}
          <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-richblack-300 uppercase tracking-wider">Withdrawable Balance</span>
              <span className="text-3xl font-extrabold text-caribbeangreen-100">₹ {summary?.currentBalance.toFixed(2) || "0.00"}</span>
              <span className="text-xs text-richblack-400">80% of sales ready for withdrawal</span>
            </div>
            <div className="p-4 bg-caribbeangreen-100 bg-opacity-10 text-caribbeangreen-200 rounded-xl">
              <RiWallet3Line size={32} />
            </div>
          </div>

          {/* Card 2: Total Earnings */}
          <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-richblack-300 uppercase tracking-wider">Total Earnings (Gross)</span>
              <span className="text-3xl font-extrabold text-blue-200">₹ {summary?.totalEarnings.toFixed(2) || "0.00"}</span>
              <span className="text-xs text-richblack-400">All-time Gross Revenues (excluding 20% charge)</span>
            </div>
            <div className="p-4 bg-blue-200 bg-opacity-10 text-blue-200 rounded-xl">
              <RiBankCardLine size={32} />
            </div>
          </div>

          {/* Card 3: Total Withdrawn */}
          <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-richblack-300 uppercase tracking-wider">Total Withdrawn</span>
              <span className="text-3xl font-extrabold text-pink-200">₹ {summary?.withdrawnAmount.toFixed(2) || "0.00"}</span>
              <span className="text-xs text-richblack-400">Transferred successfully to bank/UPI</span>
            </div>
            <div className="p-4 bg-pink-200 bg-opacity-10 text-pink-200 rounded-xl">
              <RiHistoryLine size={32} />
            </div>
          </div>

        </div>

        {/* Content Section: details Config & Payout History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Config column (left 1/3) */}
          <div className="lg:col-span-1 bg-richblack-800 border border-richblack-700 rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-richblack-5">Payout Destination</h2>
              {!editingDetails && (
                <button
                  onClick={() => setEditingDetails(true)}
                  className="text-sm text-yellow-50 hover:underline"
                >
                  Edit details
                </button>
              )}
            </div>

            {editingDetails ? (
              <form onSubmit={handleUpdateDetails} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-richblack-300">UPI ID</label>
                  <input
                    type="text"
                    value={bankDetails.upiId}
                    placeholder="e.g. name@upi"
                    onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                    className="p-3 bg-richblack-700 rounded-lg text-sm outline-none border border-richblack-600 focus:border-yellow-25"
                  />
                </div>
                <div className="text-center text-xs text-richblack-400 my-1">— OR BANK DETAILS —</div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-richblack-300">Account Holder Name</label>
                  <input
                    type="text"
                    value={bankDetails.accountHolderName}
                    placeholder="As in passbook"
                    onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                    className="p-3 bg-richblack-700 rounded-lg text-sm outline-none border border-richblack-600 focus:border-yellow-25"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-richblack-300">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.bankAccount}
                    placeholder="e.g. 12345678901"
                    onChange={(e) => setBankDetails({ ...bankDetails, bankAccount: e.target.value })}
                    className="p-3 bg-richblack-700 rounded-lg text-sm outline-none border border-richblack-600 focus:border-yellow-25"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-richblack-300">IFSC Code</label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    placeholder="e.g. SBIN0001234"
                    onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                    className="p-3 bg-richblack-700 rounded-lg text-sm outline-none border border-richblack-600 focus:border-yellow-25"
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-lg text-sm transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBankDetails(summary?.payoutDetails || {
                        bankAccount: "",
                        ifscCode: "",
                        accountHolderName: "",
                        upiId: ""
                      });
                      setEditingDetails(false);
                    }}
                    className="flex-1 py-2.5 bg-richblack-600 hover:bg-richblack-500 text-richblack-100 font-bold rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 text-sm text-richblack-100">
                {bankDetails.upiId ? (
                  <div className="p-4 bg-richblack-900 rounded-xl border border-richblack-700">
                    <p className="text-xs text-richblack-400">Configured UPI ID</p>
                    <p className="text-lg font-bold text-richblack-5 mt-1">{bankDetails.upiId}</p>
                  </div>
                ) : bankDetails.bankAccount ? (
                  <div className="p-4 bg-richblack-900 rounded-xl border border-richblack-700 flex flex-col gap-2">
                    <div>
                      <p className="text-xs text-richblack-400">Account Holder</p>
                      <p className="font-semibold text-richblack-5">{bankDetails.accountHolderName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-richblack-400">Bank Account</p>
                      <p className="font-semibold text-richblack-5">{bankDetails.bankAccount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-richblack-400">IFSC Code</p>
                      <p className="font-semibold text-richblack-5">{bankDetails.ifscCode}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-richblack-900 rounded-xl border border-dashed border-richblack-600 text-richblack-300">
                    <p>No payout details configured.</p>
                    <button
                      onClick={() => setEditingDetails(true)}
                      className="mt-3 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold text-xs rounded-lg transition"
                    >
                      Set Up Payout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* History table column (right 2/3) */}
          <div className="lg:col-span-2 bg-richblack-800 border border-richblack-700 rounded-2xl p-6 shadow-lg overflow-hidden">
            <h2 className="text-xl font-bold text-richblack-5 mb-6">Withdrawal History</h2>
            
            {history.length === 0 ? (
              <div className="text-center py-12 text-richblack-400 border border-dashed border-richblack-700 rounded-xl">
                No past payout requests found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-richblack-100">
                  <thead className="bg-richblack-900 text-richblack-300 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="p-4 rounded-l-lg">Requested Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 rounded-r-lg">Txn Ref ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-richblack-700">
                    {history.map((req, idx) => (
                      <tr key={idx} className="hover:bg-richblack-750 transition-colors">
                        <td className="p-4 font-mono text-xs">
                          {new Date(req.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        <td className="p-4 font-bold text-richblack-5">₹ {req.amount.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            req.status === "APPROVED" ? "bg-caribbeangreen-200 text-caribbeangreen-900" :
                            req.status === "PENDING" ? "bg-yellow-200 text-yellow-900" :
                            "bg-pink-200 text-pink-900"
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {req.status === "APPROVED" ? (
                            <span className="font-mono text-xs text-richblack-200 select-all">{req.transactionId || "UTR Pending"}</span>
                          ) : (
                            <span className="text-xs text-richblack-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Withdrawal request Modal overlay */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-bold text-richblack-5 mb-2">Request Fund Withdrawal</h3>
            <p className="text-xs text-richblack-300 mb-6">
              Request to withdraw your earnings. Your current withdrawable balance is <strong>₹ {summary?.currentBalance.toFixed(2)}</strong>.
            </p>

            <form onSubmit={handleWithdrawRequest} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-richblack-300">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-lg font-bold text-richblack-400">₹</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    max={summary?.currentBalance}
                    min="1"
                    step="0.01"
                    placeholder="Enter amount to withdraw"
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full p-3 pl-8 bg-richblack-700 rounded-lg text-base outline-none border border-richblack-600 focus:border-yellow-25 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-lg transition"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWithdrawAmount("");
                    setShowWithdrawModal(false);
                  }}
                  className="flex-1 py-3 bg-richblack-600 hover:bg-richblack-500 text-richblack-100 font-bold rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FinanceDashboard;
