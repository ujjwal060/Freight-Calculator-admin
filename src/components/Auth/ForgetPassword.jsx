



import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation ke liye import
import { forgotPassword } from "../../api/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email!");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword({ email });
      alert(response.message || "OTP sent successfully!");

      // OTP bhejne ke baad verify-otp page pe jao
      navigate("/verify-otp", { state: { email } }); 
      // state ke andar email bhej diya, taki verify-otp page pe use kar sako
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP!");
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
    </div>
  );
};

export default ForgetPassword;

