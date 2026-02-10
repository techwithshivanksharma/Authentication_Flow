const API_URL = "http://localhost:5000/api/users";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration Failed");
  }

  return response.json();
};

export const loginUser = async (loginData) => {
  try {
    console.log("Login Data: ", loginData);
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log("Login Data fetched: ", data);

    if (!response.ok) {
      throw new Error(data.message || "Login Failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please login again.");
    }

    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Profile Data fetched: ", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
