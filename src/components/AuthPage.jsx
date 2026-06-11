import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        
        {/* Toggle Buttons */}
        <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md font-medium transition-all duration-300 ${
              isLogin
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md font-medium transition-all duration-300 ${
              !isLogin
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>

          
        </div>

        {/* Form Section */}
        <div>
          {isLogin ? <Login onLogin={onLogin} /> : <Register />}
        </div>

      </div>
    </div>
  );
}

export default AuthPage;