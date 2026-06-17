import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";

function AppointmentLogin() 
{

  const generateCaptcha = () => 
    {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let captcha = "";

    for (let i = 0; i < 5; i++) 
    {
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
  });

  const [captchaInput, setCaptchaInput] = useState("");
  const [message, setMessage] = useState("");

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => 
    {

    // Captcha Validation
    if (captchaInput !== captchaText) {
      setMessage("Invalid Captcha");
      refreshCaptcha();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );

      console.log(response.data);

      // Save JWT Token
      localStorage.setItem("token", response.data.jwt);

      // Save User Details
      localStorage.setItem("username", response.data.username);

      setMessage("Login Successful");

      // Redirect
      window.location.href = "/AppointmentDashboard";

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-xl shadow-lg w-[420px] overflow-hidden">

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
                placeholder="Verification Code"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              />

            </div>

            {message && (
              <div className="text-center text-red-600 font-semibold">
                {message}
              </div>
            )}

            <button  onClick={handleLogin}
  className="w-full bg-cyan-700 text-white py-3 rounded-lg text-lg font-bold 
  cursor-pointer hover:bg-cyan-800 transition">
              Login
              </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AppointmentLogin;