import meetApi from "../../axiosInterceptor.js";
import { GET_TERMS } from "../../config.js";

export const getTerms = async () => {
  try {
    const response = await meetApi.get(GET_TERMS);

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
