import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) 
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 

   const handleLogin = async (e) =>
    {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        username,
        password,
      }
    );

    console.log("Response:", response.data);

    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem(
      "roles",
      JSON.stringify(response.data.roles)
    );

    alert("Login Successful");

    onLogin?.();

    navigate("/dashboard");
  } catch (error) {
    console.error("Login Error:", error);
    console.error("Response:", error.response);

    alert(
      error.response?.data?.message ||
      "Invalid Credentials"
    );
  }
};

  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
    <div className="bg-white p-10 rounded-xl shadow-xl w-[350px] text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-6">
        Login to your account
      </p>

      <form onSubmit={handleLogin}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);


}


export default Login;