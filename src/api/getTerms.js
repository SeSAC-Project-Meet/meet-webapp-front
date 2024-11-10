import meet from "./axiosInterceptor.js";
import { GET_TERMS } from "./config";

export const getTerms = async () => {
  try {
    const response = await meet.get(GET_TERMS);

    console.log("Terms Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
