import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  useEffect(() => {
    const showSuccessToast = (message) => {
      toast.success(message);
    };

    const showErrorToast = (message) => {
      toast.error(message);
    };

    window.showSuccessToast = showSuccessToast;
    window.showErrorToast = showErrorToast;
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Toast;
