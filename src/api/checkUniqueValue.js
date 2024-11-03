import axios from "axios";
import { CHECK_UNIQUE } from "./config";

export const checkUniqueValue = async (type, value) => {
  try {
    const response = await axios.post(CHECK_UNIQUE, {
      type,
      value,
    });

    console.log("Check Unique Response:", response);

    if (response.status === 200) {
      console.log("Unique value!");
      return true;
    }
  } catch (error) {
    if (error.response.status === 409) {
      return false;
    }
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};