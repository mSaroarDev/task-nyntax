import axios from "axios";
import { getApiUrl } from "../utils/getApiUrl";
const apiUrl = getApiUrl();

// create task
export const createTask = async (values) => {
  try {
    const res = await axios.post(`${apiUrl}/task/create`, values);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get my tasks
export const getTasks = async (email) => {
  try {
    const res = await axios.get(`${apiUrl}/task/my-tasks/${email}`);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// delete
export const deleteTask = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/task/delete/${id}`);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// delete
export const markComplete = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/task/mark-complete/${id}`);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// edit
export const editTask = async (id, values) => {
  try {
    const res = await axios.patch(`${apiUrl}/task/edit/${id}`, values);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get a task by id
export const getTask = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}/task/${id}`);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};
