import { useEffect, useRef, useState } from "react";

export default function CustomSelect({
  id,
  options,
  value,
  onChange,
  placeholder = "Select",
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((item) => String(item.value) === String(value));

  return (
    <div className={`custom-select ${className}`.trim()} ref={rootRef}>
      <button
        id={id}
        type="button"
        className="custom-select-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className="custom-select-caret">{open ? "▴" : "▾"}</span>
      </button>
      {open ? (
        <div className="custom-select-menu">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`custom-select-item ${
                String(item.value) === String(value) ? "active" : ""
              }`}
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
