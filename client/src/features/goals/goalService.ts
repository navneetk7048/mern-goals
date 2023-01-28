import axios from "axios";

const API_URL = "http://localhost:5000/goals/";

const generateConfig = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Create goal
export async function createGoal(goalData: string, token: string) {
  const response = await axios.post(API_URL, goalData, generateConfig(token));

  return response.data;
}

// Get user goals
export async function getGoals(token: string) {
  const response = await axios.get(API_URL, generateConfig(token));

  return response.data;
}

// Delete user goals
export async function deleteGoal(id: string, token: string) {
  const response = await axios.delete(API_URL + id, generateConfig(token));

  return response.data;
}
