const InstructorEarning = require("../models/InstructorEarning");
const PayoutRequest = require("../models/PayoutRequest");
const User = require("../models/User");
const mailSender = require("../utils/mailSend");
const crypto = require("crypto");

exports.getEarningsSummary = async (req, res) => {
  try {
    const instructorId = req.user.id;

    // 1. Calculate dynamic gross earnings (80% share) from enrolled students in their courses
    const Course = require("../models/Course");
    const instructorCourses = await Course.find({ instructor: instructorId });
    
    let calculatedTotalEarnings = 0;
    for (const course of instructorCourses) {
      const price = course.price || 0;
      const enrolledCount = course.studentsEnrolled ? course.studentsEnrolled.length : 0;
      calculatedTotalEarnings += price * 0.80 * enrolledCount;
    }

    // 2. Fetch withdrawal requests to determine payout totals
    const approvedRequests = await PayoutRequest.find({ instructorId, status: "APPROVED" });
    const pendingRequests = await PayoutRequest.find({ instructorId, status: "PENDING" });

    const totalWithdrawn = approvedRequests.reduce((sum, r) => sum + r.amount, 0);
    const totalPending = pendingRequests.reduce((sum, r) => sum + r.amount, 0);

    const calculatedCurrentBalance = calculatedTotalEarnings - totalWithdrawn - totalPending;

    // 3. Find or create the InstructorEarning record and sync it
    let earnings = await InstructorEarning.findOne({ instructorId });
    if (!earnings) {
      earnings = new InstructorEarning({ instructorId });
    }

    earnings.totalEarnings = calculatedTotalEarnings;
    earnings.currentBalance = calculatedCurrentBalance >= 0 ? calculatedCurrentBalance : 0;
    earnings.withdrawnAmount = totalWithdrawn;
    await earnings.save();

    return res.status(200).json({
      success: true,
      message: "Earnings summary fetched successfully",
      data: earnings
    });
  } catch (error) {
    console.error("Error fetching earnings summary:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updatePayoutDetails = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { bankAccount, ifscCode, accountHolderName, upiId } = req.body;

    let earnings = await InstructorEarning.findOne({ instructorId });
    if (!earnings) {
      earnings = new InstructorEarning({ instructorId });
    }

    earnings.payoutDetails = {
      bankAccount: bankAccount || "",
      ifscCode: ifscCode || "",
      accountHolderName: accountHolderName || "",
      upiId: upiId || ""
    };

    await earnings.save();

    return res.status(200).json({
      success: true,
      message: "Payout details updated successfully",
      data: earnings
    });
  } catch (error) {
    console.error("Error updating payout details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.requestWithdrawal = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero"
      });
    }

    const earnings = await InstructorEarning.findOne({ instructorId });
    if (!earnings || earnings.currentBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance for withdrawal"
      });
    }

    const details = earnings.payoutDetails;
    if (!details.upiId && (!details.bankAccount || !details.ifscCode)) {
      return res.status(400).json({
        success: false,
        message: "Please configure bank or UPI details first"
      });
    }

    const instructorUser = await User.findById(instructorId);
    if (!instructorUser) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      });
    }

    // Generate secure single-use token
    const token = crypto.randomBytes(32).toString("hex");

    const request = new PayoutRequest({
      instructorId,
      amount,
      paymentDetailsUsed: details,
      approvalToken: token,
      tokenExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    await request.save();

    // Deduct balance immediately to prevent double spending
    earnings.currentBalance -= amount;
    await earnings.save();

    // Send email to admin for quick action
    const adminEmail = process.env.ADMIN_EMAIL || "admin@scholarbay.com";
    const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
    const approveUrl = `${serverUrl}/api/v1/payout/admin/quick-action?action=approve&token=${token}`;
    const rejectUrl = `${serverUrl}/api/v1/payout/admin/quick-action?action=reject&token=${token}`;

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>New Withdrawal Request</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
          .header { font-size: 20px; font-weight: bold; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px; }
          .details { background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
          .btn-container { display: flex; gap: 15px; margin-top: 20px; }
          .btn { padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; color: white; }
          .btn-approve { background-color: #22c55e; }
          .btn-reject { background-color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">New Withdrawal Request Received</div>
          <p>An instructor has requested a payout withdrawal. Details below:</p>
          <div class="details">
            <p><strong>Instructor Name:</strong> ${instructorUser.firstName} ${instructorUser.lastName}</p>
            <p><strong>Email Address:</strong> ${instructorUser.email}</p>
            <p><strong>Requested Amount:</strong> ₹${amount}</p>
            <p><strong>Withdrawal Mode:</strong> ${details.upiId ? 'UPI' : 'Bank Transfer'}</p>
            ${details.upiId ? `<p><strong>UPI ID:</strong> ${details.upiId}</p>` : `
              <p><strong>Bank Account:</strong> ${details.bankAccount}</p>
              <p><strong>IFSC Code:</strong> ${details.ifscCode}</p>
              <p><strong>Account Holder:</strong> ${details.accountHolderName}</p>
            `}
          </div>
          <p>Please review and select an action below:</p>
          <div class="btn-container">
            <a href="${approveUrl}" class="btn btn-approve">Approve Request</a>
            <a href="${rejectUrl}" class="btn btn-reject">Reject Request</a>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await mailSender(
        adminEmail,
        `[PAYOUT REQUEST] Instructor ${instructorUser.firstName} requested ₹${amount}`,
        emailBody
      );
    } catch (mailError) {
      console.error("Error sending payout request email to admin:", mailError);
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawal request submitted successfully",
      data: request
    });
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getPayoutHistory = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const history = await PayoutRequest.find({ instructorId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Payout history fetched successfully",
      data: history
    });
  } catch (error) {
    console.error("Error fetching payout history:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.processQuickAction = async (req, res) => {
  try {
    const { action, token } = req.query;

    if (!token) {
      return res.status(400).send("Security token is missing from link");
    }

    const request = await PayoutRequest.findOne({
      approvalToken: token,
      tokenExpires: { $gt: Date.now() }
    });

    if (!request) {
      return res.send(`
        <div style="text-align:center; font-family:sans-serif; margin-top:80px; padding: 20px;">
          <h2 style="color:#ef4444; font-size: 28px;">Action Link Expired or Invalid</h2>
          <p style="color:#64748b; font-size: 16px;">This payout request has already been processed, or the link has expired (24h limit).</p>
        </div>
      `);
    }

    if (action === "approve") {
      request.status = "APPROVED";
      request.processedAt = new Date();
      request.approvalToken = undefined; // Single-use
      request.adminRemarks = "Quick-approved via Admin Mail link";
      request.transactionId = `TXN-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
      await request.save();

      // Update withdrawnAmount
      await InstructorEarning.findOneAndUpdate(
        { instructorId: request.instructorId },
        { $inc: { withdrawnAmount: request.amount } }
      );

      return res.send(`
        <div style="text-align:center; font-family:sans-serif; margin-top:80px; padding: 20px; max-width: 500px; margin-left: auto; margin-right: auto; border: 1px solid #cbd5e1; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <h2 style="color:#22c55e; font-size: 26px; margin-bottom: 10px;">Payout Request Approved!</h2>
          <p style="color:#334155; font-size: 15px; margin-bottom: 20px;">The payout of <strong>₹${request.amount}</strong> is successfully approved and marked completed.</p>
          <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 14px; color: #475569;">
            Transaction ID generated: <strong>${request.transactionId}</strong>
          </div>
        </div>
      `);
    } else if (action === "reject") {
      request.status = "REJECTED";
      request.processedAt = new Date();
      request.approvalToken = undefined; // Single-use
      request.adminRemarks = "Quick-rejected via Admin Mail link";
      await request.save();

      // Refund the amount back to the instructor's withdrawable balance
      await InstructorEarning.findOneAndUpdate(
        { instructorId: request.instructorId },
        { $inc: { currentBalance: request.amount } }
      );

      return res.send(`
        <div style="text-align:center; font-family:sans-serif; margin-top:80px; padding: 20px; max-width: 500px; margin-left: auto; margin-right: auto; border: 1px solid #cbd5e1; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <h2 style="color:#ef4444; font-size: 26px; margin-bottom: 10px;">Payout Request Rejected</h2>
          <p style="color:#334155; font-size: 15px; margin-bottom: 20px;">The payout request has been rejected.</p>
          <div style="background-color: #fdf2f2; padding: 12px; border-radius: 6px; font-size: 14px; color: #991b1b;">
            ₹${request.amount} has been refunded back to the instructor's current balance.
          </div>
        </div>
      `);
    }

    return res.status(400).send("Invalid action");
  } catch (error) {
    console.error("Error processing quick action payout:", error);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};
