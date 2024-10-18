import axios from "axios";
import { getApiUrl } from "../utils/getApiUrl";
const apiUrl = getApiUrl();

// user register
export const register = async (values) => {
  try {
    const res = await axios.post(`${apiUrl}/user/register`, values);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// user register
export const login = async (values) => {
  try {
    const res = await axios.post(`${apiUrl}/user/login`, values);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};
