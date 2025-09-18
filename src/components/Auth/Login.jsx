


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setError("");

      const res = await loginUser({ email: data.email, password: data.password });
      console.log("Login Response:", res);

      if (res.admin?.token) {
        localStorage.setItem("token", res.admin.token);
        localStorage.setItem("refreshToken", res.admin.refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        console.log(res.admin.refreshToken , res.admin.token)

        alert(res.message || "Admin logged in successfully");
        navigate("/dashboard"); // ✅ Works now because PrivateRoute allows access
      } else {
        setError("Invalid credentials!");
      }
    } catch (err) {
      setError("Login failed! Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome back!</h1>
        <p>Glad to see you, Again!</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <span className="icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <div className="auth-links">
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <button type="submit" className="btn-primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

