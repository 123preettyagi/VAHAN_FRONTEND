import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";

function HelpdeskLogin() {
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let captcha = "";

    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    return captcha;
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    captcha: "",
  });

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    // CAPTCHA VALIDATION
    if (loginData.captcha !== captchaText) {
      alert("Invalid CAPTCHA");
      refreshCaptcha();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: loginData.username,
          password: loginData.password,
        }
      );

      console.log(response.data);

      // Store JWT
      localStorage.setItem("token", response.data.jwt);

      // Store user details
      localStorage.setItem(
        "username",
        response.data.username
      );

      alert("Login Successful");

      // Redirect
      window.location.href = "/VahanDashboard";
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Login Failed");
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          Vahan Online Complaints
        </h1>

        <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
          <div className="bg-cyan-700 text-white text-center py-3 text-xl font-bold">
            Login
          </div>

          <div className="p-6 space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={loginData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-100"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <div className="flex items-center gap-3">
              <div className="w-28 h-14 border flex items-center justify-center bg-gray-100 text-2xl font-bold tracking-widest rounded">
                {captchaText}
              </div>

              <button
                type="button"
                onClick={refreshCaptcha}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg"
              >
                ↻
              </button>

              <input
                type="text"
                name="captcha"
                placeholder="Verification Code"
                value={loginData.captcha}
                onChange={handleChange}
                className="flex-1 p-3 border rounded-lg"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-cyan-700 text-white py-3 rounded-lg text-lg font-bold hover:bg-cyan-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HelpdeskLogin;