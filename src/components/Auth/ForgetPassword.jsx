



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword({ email });
      toast.success(response.message || "OTP sent successfully!");

      // OTP bhejne ke baad verify-otp page pe jao
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Forget Password</h1>
        <p>Enter your registered email to reset password</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgetPassword;
