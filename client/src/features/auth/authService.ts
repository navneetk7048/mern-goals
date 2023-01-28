import axios from "axios";
import UserLogin from "../../types/UserLogin";
import UserRegister from "../../types/UserRegister";

const API_URL = "http://localhost:5000/users/";

// Register user
export async function register(userData: UserRegister) {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

// Login user
export async function login(userData: UserLogin) {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

// Logout user
export async function logout() {
  localStorage.removeItem("user");
}
