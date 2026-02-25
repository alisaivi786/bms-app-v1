export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) {
  if (!open) return null;

  return (
    <div className="budget-modal-backdrop">
      <div className="form-card budget-modal-card budget-modal-shell budget-category-modal-shell">
        <h2>{title}</h2>
        <p className="muted">{message}</p>
        <div className="row-field">
          <button className="btn budget-modal-primary-btn" type="button" onClick={onConfirm}>
            {confirmText}
          </button>
          <button
            className="btn btn-outline budget-modal-secondary-btn"
            type="button"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
