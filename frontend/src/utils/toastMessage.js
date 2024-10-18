import { toast } from "react-hot-toast";

export const showSuccess = (message) => {
  return toast.success(message);
};

export const showError = (message) => {
  return toast.error(message);
};
