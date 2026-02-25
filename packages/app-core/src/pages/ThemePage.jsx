import { useThemeStore, defaultTheme } from "../state/themeStore";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import CustomSelect from "../components/CustomSelect";

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
  const { user } = useAuth();
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setThemeValue = useThemeStore((state) => state.setThemeValue);

  const persistTheme = async (nextMode, nextTheme) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          themeMode: nextMode,
          themeColors: nextTheme,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Could not save theme settings", err);
    }
  };

  const handleModeChange = async (nextMode) => {
    setMode(nextMode);
    await persistTheme(nextMode, theme);
  };

  const handleThemeValueChange = async (key, value) => {
    const nextTheme = { ...theme, [key]: value };
    setThemeValue(key, value);
    await persistTheme(mode, nextTheme);
  };

  const handleReset = async () => {
    setTheme(defaultTheme);
    await persistTheme(mode, defaultTheme);
  };

  return (
    <section>
      <h1>Theme Settings</h1>
      <p className="muted">Customize colors for the full app.</p>
      <div className="form-card">
        <div className="field">
          <label htmlFor="themeMode">Theme Mode</label>
          <CustomSelect
            value={mode}
            onChange={handleModeChange}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" }
            ]}
          />
        </div>
        {fields.map((field) => (
          <div className="field row-field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            <div className="color-input-wrap">
              <input
                id={field.key}
                type="color"
                value={theme[field.key]}
                onChange={(event) => handleThemeValueChange(field.key, event.target.value)}
              />
              <input
                value={theme[field.key]}
                onChange={(event) => handleThemeValueChange(field.key, event.target.value)}
              />
            </div>
          </div>
        ))}
        <button className="btn" onClick={handleReset}>
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
