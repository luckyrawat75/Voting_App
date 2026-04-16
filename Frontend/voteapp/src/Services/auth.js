import API from "./api";

// 🔐 LOGIN
export const loginUser = async (data) => {
  try {
    const res = await API.post("/login", data);

    // save token + user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

// 📝 REGISTER
export const registerUser = async (data) => {
  try {
    const res = await API.post("/register", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Register failed";
  }
};

// 🚪 LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 👤 GET USER
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// 🔑 GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};