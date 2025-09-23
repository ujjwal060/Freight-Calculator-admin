


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // Auth Pages
// import Login from "./components/Auth/Login";
// import VerifyOtp from "./components/Auth/VerifyOtp";
// import ResetPassword from "./components/Auth/ResetPassword";
// import ForgotPassword from './components/Auth/ForgetPassword';

// // Protected Pages
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import Users from "./Pages/Users/UserDetails";
// import Booking from "./Pages/Booking/Booking";
// import PaymentDetails from "./Pages/PaymentDetails/PaymentDetails";
// import Layout from "./components/Layout/Layout";
// import FreightRate from "./Pages/FreightRate/FreightRate";
// import AddFreightDialog from "./Pages/FreightRate/AddFreightDialog";

// import PrivateRoute from "./components/PrivateRoute";
// import "./index.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//               <ToastContainer /> {/* ✅ Add here */}

//         {/* Auth Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* Protected Routes with PrivateRoute */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Layout />
//             </PrivateRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<Users />} />
//           <Route path="bookings" element={<Booking />} />
//           <Route path="payments" element={<PaymentDetails />} />
//           <Route path="freight-rate" element={<FreightRate />} />
//           <Route path="freight-rate/add" element={<AddFreightDialog />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import Login from "./components/Auth/Login";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from './components/Auth/ForgetPassword';

// Protected Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/UserDetails";
import Booking from "./Pages/Booking/Booking";
import PaymentDetails from "./Pages/PaymentDetails/PaymentDetails";
import Layout from "./components/Layout/Layout";
import FreightRate from "./Pages/FreightRate/FreightRate";
import AddFreightDialog from "./Pages/FreightRate/AddFreightDialog";

import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes with PrivateRoute */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="payments" element={<PaymentDetails />} />
          <Route path="freight-rate" element={<FreightRate />} />
          <Route path="freight-rate/add" element={<AddFreightDialog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
