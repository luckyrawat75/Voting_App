import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";


import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharCardNumber: "",
    password: "",
   
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/signup", formData); // 
     
      toast.success("User Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
     toast.error(err.response?.data?.error || "Error registering user ❌"); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600">
      <form className="bg-white p-6 rounded-xl shadow-md w-96" onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input name="name" type="text" placeholder="Name"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="age" type="number" placeholder="Age"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="email" type="email" placeholder="Email"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="mobile" type="text" placeholder="Mobile"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="address" type="text" placeholder="Address"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="aadharCardNumber" type="text" placeholder="Aadhar Number"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <input name="password" type="password" placeholder="Password"
          className="w-full mb-3 p-2 border rounded" onChange={handleChange} />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;