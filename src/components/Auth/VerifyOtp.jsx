


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Email from ForgetPassword page
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Verify OTP API
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP!");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp });
      toast.success(response.message || "OTP verified successfully!");

      // OTP verified → Go to Reset Password page
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP API
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found! Please go back and try again.");
      return;
    }

    setResending(true);
    try {
      const response = await axios.post(
        "http://15.134.44.62:8888/api/admin/auth/resend-otp",
        { email }
      );
      toast.success(response.data.message || "OTP resent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP!");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Verify OTP</h1>
        <p>OTP sent to: {email}</p>
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="resend-otp" style={{ marginTop: "15px" }}>
          <p>
            Didn't receive the OTP?{" "}
            <span
              style={{
                color: "#007bff",
                cursor: resending ? "not-allowed" : "pointer",
                textDecoration: "underline",
              }}
              onClick={!resending ? handleResendOtp : undefined}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </span>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VerifyOtp;
