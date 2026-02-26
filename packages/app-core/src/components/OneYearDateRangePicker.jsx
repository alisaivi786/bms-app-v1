import { useEffect, useMemo, useRef, useState } from "react";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseIsoDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const [y, m, d] = raw.split("-").map(Number);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function monthLabel(date) {
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, diff) {
  return new Date(date.getFullYear(), date.getMonth() + diff, 1);
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function diffDays(from, to) {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.floor(ms / 86400000) + 1;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthCells(monthDate) {
  const first = startOfMonth(monthDate);
  const startOffset = first.getDay();
  const gridStart = new Date(first.getFullYear(), first.getMonth(), 1 - startOffset);
  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
    return day;
  });
}

export default function OneYearDateRangePicker({
  label,
  value,
  onChange,
  isRequired = false,
  maxPossibleDate = new Date(),
  customSelectionRangeDays = 365,
  hasTimePicker = false
}) {
  const rootRef = useRef(null);
  const initialFrom = parseIsoDate(value?.fromDate);
  const initialTo = parseIsoDate(value?.toDate);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [start, setStart] = useState(initialFrom);
  const [end, setEnd] = useState(initialTo);
  const [startTime, setStartTime] = useState(String(value?.startTime || "00:00"));
  const [endTime, setEndTime] = useState(String(value?.endTime || "23:59"));
  const [leftMonth, setLeftMonth] = useState(startOfMonth(initialFrom || new Date()));

  const maxDate = startOfDay(maxPossibleDate);
  const rightMonth = useMemo(() => addMonths(leftMonth, 1), [leftMonth]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    const nextFrom = parseIsoDate(value?.fromDate);
    const nextTo = parseIsoDate(value?.toDate);
    setStart(nextFrom);
    setEnd(nextTo);
    setStartTime(String(value?.startTime || "00:00"));
    setEndTime(String(value?.endTime || "23:59"));
    if (open) {
      setLeftMonth(startOfMonth(nextFrom || new Date()));
      setError("");
    }
  }, [open, value?.fromDate, value?.toDate, value?.startTime, value?.endTime]);

  const displayText =
    start && end
      ? `${formatDisplay(start)} ${hasTimePicker ? startTime : ""} - ${formatDisplay(end)} ${
          hasTimePicker ? endTime : ""
        }`.trim()
      : "From DD/MM/YYYY - To DD/MM/YYYY";

  const handleDayClick = (date) => {
    if (date > maxDate) return;
    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
      return;
    }
    if (date < start) {
      setEnd(start);
      setStart(date);
      return;
    }
    setEnd(date);
  };

  const inRange = (date) => {
    if (!(start && end)) return false;
    return date >= start && date <= end;
  };

  const canApply = !isRequired || (start && end);

  const apply = () => {
    setError("");
    if (isRequired && !(start && end)) {
      setError("Date range is required.");
      return;
    }
    if (start && end && diffDays(start, end) > customSelectionRangeDays) {
      setError(`Maximum range is ${customSelectionRangeDays} days.`);
      return;
    }
    onChange({
      fromDate: start ? toIsoDate(start) : "",
      toDate: end ? toIsoDate(end) : "",
      startTime,
      endTime
    });
    setOpen(false);
  };

  const renderMonth = (monthDate) => {
    const cells = buildMonthCells(monthDate);
    return (
      <div className="oydrp-month">
        <div className="oydrp-month-title">{monthLabel(monthDate)}</div>
        <div className="oydrp-weekdays">
          {WEEK_DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="oydrp-days">
          {cells.map((date) => {
            const outside = date.getMonth() !== monthDate.getMonth();
            const disabled = date > maxDate;
            const isStart = start && isSameDay(date, start);
            const isEnd = end && isSameDay(date, end);
            return (
              <button
                key={date.toISOString()}
                type="button"
                className={[
                  "oydrp-day",
                  outside ? "outside" : "",
                  disabled ? "disabled" : "",
                  inRange(date) ? "in-range" : "",
                  isStart ? "start" : "",
                  isEnd ? "end" : ""
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={disabled}
                onClick={() => handleDayClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="field oydrp" ref={rootRef}>
      <label>{label}</label>
      <button className="oydrp-trigger" type="button" onClick={() => setOpen((v) => !v)}>
        <span className={start && end ? "" : "muted"}>{displayText}</span>
        <span className="oydrp-trigger-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <line x1="8" y1="2.5" x2="8" y2="6" />
            <line x1="16" y1="2.5" x2="16" y2="6" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="oydrp-popover">
          <div className="oydrp-nav">
            <button type="button" className="btn btn-inline btn-outline" onClick={() => setLeftMonth(addMonths(leftMonth, -1))}>
              ◀
            </button>
            <button type="button" className="btn btn-inline btn-outline" onClick={() => setLeftMonth(addMonths(leftMonth, 1))}>
              ▶
            </button>
          </div>

          <div className="oydrp-months">
            {renderMonth(leftMonth)}
            {renderMonth(rightMonth)}
          </div>

          {error ? <p className="error">{error}</p> : null}
          {hasTimePicker ? (
            <div className="oydrp-time-row">
              <label>
                Start Time
                <input
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value || "00:00")}
                />
              </label>
              <label>
                End Time
                <input
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value || "23:59")}
                />
              </label>
            </div>
          ) : null}
          <div className="oydrp-actions">
            <button className="btn btn-inline btn-outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-inline" type="button" onClick={apply} disabled={!canApply}>
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function OneYearDatePickerComponent({
  form,
  field,
  label,
  isRequired = false,
  maxPossibleDate,
  hasTimePicker,
  customSelectionRangeDays
}) {
  return (
    <OneYearDateRangePicker
      label={label}
      value={form?.values?.[field] || { fromDate: "", toDate: "" }}
      onChange={(nextValue) => form?.setFieldValue?.(field, nextValue)}
      isRequired={isRequired}
      maxPossibleDate={maxPossibleDate}
      hasTimePicker={hasTimePicker}
      customSelectionRangeDays={customSelectionRangeDays ?? 365}
    />
  );
}
