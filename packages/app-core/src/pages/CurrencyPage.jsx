import { CURRENCY_OPTIONS, usePreferencesStore } from "../state/preferencesStore";

export default function CurrencyPage() {
  const currency = usePreferencesStore((state) => state.currency);
  const setCurrency = usePreferencesStore((state) => state.setCurrency);

  return (
    <section>
      <h1>Currency Settings</h1>
      <p className="muted">Choose your preferred currency for the entire app.</p>

      <div className="form-card">
        <div className="field">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            {CURRENCY_OPTIONS.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <p className="muted">Selected currency: {currency}</p>
      </div>
    </section>
  );
}
