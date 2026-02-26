import CustomSelect from "./CustomSelect";

export default function GridPageSizeSelect({
  id,
  value,
  onChange,
  options = [10, 20, 30, 50, 100]
}) {
  return (
    <div className="grid-page-size">
      <span className="muted">Show</span>
      <CustomSelect
        id={id}
        value={value}
        onChange={(next) => onChange(Number(next))}
        options={options.map((size) => ({ value: size, label: String(size) }))}
      />
      <span className="muted">entries</span>
    </div>
  );
}
