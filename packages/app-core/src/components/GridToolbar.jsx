export default function GridToolbar({ left, right }) {
  return (
    <div className="grid-toolbar">
      <div className="grid-toolbar-left">{left}</div>
      <div className="grid-toolbar-right">{right}</div>
    </div>
  );
}
