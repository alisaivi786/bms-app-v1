function normalizeValue(value) {
  if (value == null) return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value).trim();
}

function isDirty(values, defaults) {
  const keys = new Set([...Object.keys(defaults || {}), ...Object.keys(values || {})]);
  for (const key of keys) {
    if (normalizeValue(values?.[key]) !== normalizeValue(defaults?.[key])) {
      return true;
    }
  }
  return false;
}

export default function CustomSearchForm({
  values,
  defaultValues,
  onSubmit,
  onReset,
  children,
  searchLabel = "Search",
  resetLabel = "Reset"
}) {
  const canReset = isDirty(values || {}, defaultValues || {});

  return (
    <div className="form-card custom-search-card">
      <form className="custom-search-form" onSubmit={onSubmit}>
        <div className="custom-search-fields">{children}</div>
        <div className="custom-search-actions">
          <button className="btn btn-inline" type="submit">
            {searchLabel}
          </button>
          <button className="btn btn-inline btn-outline" type="button" onClick={onReset} disabled={!canReset}>
            {resetLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
