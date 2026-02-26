import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function AlertMessage({ type = "success", message }) {
  useEffect(() => {
    if (!message) return;
    const toastId = `${type}:${message}`;

    toast.custom(
      () => (
        <div className={`alert ${type === "error" ? "alert-error" : "alert-success"}`}>
          <div>{message}</div>
          <button
            className="alert-close-btn"
            type="button"
            aria-label="Close alert"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toast.dismiss(toastId);
            }}
          >
            x
          </button>
        </div>
      ),
      {
        id: toastId,
        duration: type === "error" ? 5000 : 3500
      }
    );
  }, [message, type]);

  return null;
}
