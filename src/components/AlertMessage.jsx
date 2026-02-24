export default function AlertMessage({ type = "success", message }) {
  if (!message) return null;
  const className = type === "error" ? "alert alert-error" : "alert alert-success";
  return (
    <div className={className} role="alert" aria-live="polite">
      {message}
    </div>
  );
}
