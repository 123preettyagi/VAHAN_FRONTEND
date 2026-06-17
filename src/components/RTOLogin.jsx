import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RTOLogin()
 {
  const navigate = useNavigate();
  const generateCaptcha = () => 
    {
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

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleLogin = async () => {
    if (captchaInput !== captcha) {
      alert("Invalid Captcha");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid Username or Password");
      }

      const data = await response.json();

      console.log(data);

      // Save JWT Token
      localStorage.setItem("token", data.jwt);

      // Save User Details
      localStorage.setItem("username", data.username);

      localStorage.setItem(
        "roles",
        JSON.stringify(data.roles)
      );

      alert("Login Successful");

      // Redirect
      //window.location.href = "/rto-dashboard";
      navigate("/rto-dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
      refreshCaptcha();
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          background:
            "linear-gradient(to right, #d9f1f5, #ffffff)",
        }}
      >
        <div className="w-[420px] bg-white rounded-2xl shadow-xl border overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 text-white text-center text-2xl font-bold py-3">
            Login
          </div>

          <div className="p-6">
            {/* Username */}
            <div className="mb-4 relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-700 text-lg" />

              <input
                type="text"
                placeholder="Enter User ID"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3 text-base border rounded-xl bg-cyan-100 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-700 text-lg" />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3 text-base border rounded-xl focus:outline-none"
              />
            </div>

            {/* Captcha */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium text-sm">
                  Captcha *
                </span>

                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-blue-600 text-lg"
                >
                  ↻
                </button>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-white border-2 border-gray-400 px-4 py-2 text-xl font-bold tracking-widest select-none">
                  {captcha}
                </div>

                <input
                  type="text"
                  placeholder="Verification"
                  value={captchaInput}
                  onChange={(e) =>
                    setCaptchaInput(e.target.value)
                  }
                  className="flex-1 border px-3 py-2 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogin}
                className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg text-base font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg text-base font-semibold"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RTOLogin;