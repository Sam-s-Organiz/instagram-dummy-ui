import axios from "axios";

const BASE_URL = "http://localhost:8081/api/user";

export const searchUsers = async (
  term: string,
  start = 0,
  pageSize = 10
): Promise<any[]> => {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `${BASE_URL}/search?term=${term}&start=${start}&pageSize=${pageSize}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};
