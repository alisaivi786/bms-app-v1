import { useThemeStore, defaultTheme } from "../state/themeStore";

const fields = [
  { key: "text", label: "Primary Text" },
  { key: "bgStart", label: "Background Start" },
  { key: "bgEnd", label: "Background End" },
  { key: "sidebarBg", label: "Sidebar Background" },
  { key: "sidebarText", label: "Sidebar Text" },
  { key: "accent", label: "Accent" },
  { key: "button", label: "Button" }
];

export default function ThemePage() {
  const theme = useThemeStore((state) => state.theme);
  const setThemeValue = useThemeStore((state) => state.setThemeValue);
  const resetTheme = useThemeStore((state) => state.resetTheme);

  return (
    <section>
      <h1>Theme Settings</h1>
      <p className="muted">Customize colors for the full app.</p>
      <div className="form-card">
        {fields.map((field) => (
          <div className="field row-field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            <div className="color-input-wrap">
              <input
                id={field.key}
                type="color"
                value={theme[field.key]}
                onChange={(event) => setThemeValue(field.key, event.target.value)}
              />
              <input
                value={theme[field.key]}
                onChange={(event) => setThemeValue(field.key, event.target.value)}
              />
            </div>
          </div>
        ))}
        <button className="btn" onClick={resetTheme}>
          Reset Default Theme
        </button>
      </div>

      <div className="table-card">
        <h3>Current Theme Preview</h3>
        <p className="muted">
          Default palette: {defaultTheme.sidebarBg}, {defaultTheme.accent}, {defaultTheme.button}
        </p>
      </div>
    </section>
  );
}
