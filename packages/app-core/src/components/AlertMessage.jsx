import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function AlertMessage({ type = "success", message }) {
  useEffect(() => {
    if (!message) return;
    const toastId = `${type}:${message}`;
    if (type === "error") {
      toast.error(message, { id: toastId });
      return;
    }
    toast.success(message, { id: toastId });
  }, [message, type]);

  return null;
}
