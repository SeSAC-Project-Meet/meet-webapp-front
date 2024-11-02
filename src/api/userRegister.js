import axios from "axios";
import { USER_REGISTER } from "./config";

export const userRegister = async (data) => {
  const { name, email, phone_number, password } = data;
  const newUser = await axios.post(USER_REGISTER, {
    name,
    email,
    phone_number,
    password,
  });

  if (newUser.status === 201) {
    return true;
  } else return false;
};
