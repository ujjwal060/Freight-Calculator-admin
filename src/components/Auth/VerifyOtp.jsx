


// import React, { useState } from "react";

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState("");

//   const handleVerify = (e) => {
//     e.preventDefault();
//     console.log("OTP:", otp);
//   };

//   const handleResendOtp = () => {
//     console.log("Resend OTP clicked");
//     // Call your API here to resend the OTP if needed
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h1>Verify OTP</h1>
//         <p>Enter the OTP sent to your email</p>
//         <form onSubmit={handleVerify}>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn-primary">
//             Verify
//           </button>
//         </form>

//         {/* Resend OTP Button */}
//         <div className="resend-otp">
//           <p>Didn't receive the OTP?</p>
//           <button type="button" className="btn-primary" onClick={handleResendOtp}>
//             Resend OTP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;



// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { verifyOtp } from "../../api/auth"; // Verify OTP API
// import axios from "axios"; // Resend OTP ke liye

// const VerifyOtp = () => {
//   const location = useLocation();
//   const email = location.state?.email || ""; // ForgetPassword se email aayega
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);

//   // OTP verify API call
//   const handleVerify = async (e) => {
//     e.preventDefault();

//     if (!otp) {
//       alert("Please enter the OTP!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await verifyOtp({ email, otp });
//       alert(response.message || "OTP verified successfully!");
//       // Aage password reset page pe navigate karna ho to yahan kara sakte hain
//       // navigate("/reset-password", { state: { email } });
//     } catch (error) {
//       alert(error.response?.data?.message || "OTP verification failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP API call
//   const handleResendOtp = async () => {
//     if (!email) {
//       alert("Email not found! Please go back and try again.");
//       return;
//     }

//     setResending(true);
//     try {
//       const response = await axios.post(
//         "http://15.134.44.62:8888/api/admin/auth/resend-otp",
//         { email }
//       );
//       alert(response.data.message || "OTP resent successfully!");
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to resend OTP!");
//     } finally {
//       setResending(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h1>Verify OTP</h1>
//         <p>OTP sent to: {email}</p>
//         <form onSubmit={handleVerify}>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn-primary" disabled={loading}>
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         {/* Resend OTP Button */}
//         <div className="resend-otp">
//           <p>Didn't receive the OTP?</p>
//           <button
//             type="button"
//             className="btn-primary"
//             onClick={handleResendOtp}
//             disabled={resending}
//           >
//             {resending ? "Resending..." : "Resend OTP"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/auth";
import axios from "axios";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // ForgetPassword se email pass hoga
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Verify OTP API
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP!");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp({ email, otp });
      alert(response.message || "OTP verified successfully!");
      
      // ✅ OTP verified hone ke baad reset password page pe bhej do
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP API
  const handleResendOtp = async () => {
    if (!email) {
      alert("Email not found! Please go back and try again.");
      return;
    }

    setResending(true);
    try {
      const response = await axios.post(
        "http://15.134.44.62:8888/api/admin/auth/resend-otp",
        { email }
      );
      alert(response.data.message || "OTP resent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP!");
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

        <div className="resend-otp">
          <p>Didn't receive the OTP?</p>
          <button
            type="button"
            className="btn-primary"
            onClick={handleResendOtp}
            disabled={resending}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

