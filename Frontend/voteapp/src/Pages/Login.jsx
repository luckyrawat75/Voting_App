import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", { // ✅ correct route
        aadharCardNumber: aadhar,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login Successful ✅");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vote");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input type="text" placeholder="Aadhar Number" value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full mb-3 p-2 border rounded" />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded" />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;