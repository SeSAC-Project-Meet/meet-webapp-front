import axios from "axios";
import { CREATE_MEETROOM } from "./config";

export const createMeetroom = async (meetroom) => {
  try {
    const response = await axios.post(CREATE_MEETROOM, meetroom, {
      withCredentials: true,
    });

    console.log("Meetroom Response:", response.data);
    const { user_meetroom_id, meetroom_id } = response.data;
    return { user_meetroom_id, meetroom_id };
  } catch (error) {
    console.error(
      "Error creating meetroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
