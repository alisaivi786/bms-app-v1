import { useEffect, useState } from "react";
import { z } from "zod";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";

const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 2 + i);
const incomeSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000).max(3000),
  source: z.string().trim().min(1, "Income source is required."),
  amount: z.coerce.number().positive("Amount must be greater than 0.")
});
const initialBalanceSchema = z.coerce
  .number()
  .min(0, "Initial balance must be 0 or greater.");

export default function IncomePage() {
  const { user } = useAuth();
  const userData = useFinanceStore((state) => state.userDataByUid[user.uid]);
  const setInitialBalanceForUser = useFinanceStore((state) => state.setInitialBalanceForUser);
  const now = new Date();
  const [formData, setFormData] = useState({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    source: "",
    amount: ""
  });
  const [initialBalance, setInitialBalance] = useState(
    String(userData?.initialBalance ?? "")
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData?.initialBalance !== undefined) {
      setInitialBalance(String(userData.initialBalance));
    }
  }, [userData?.initialBalance]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveInitialBalance = async () => {
    setError("");
    setStatus("");
    const parsed = initialBalanceSchema.safeParse(initialBalance);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid initial balance.");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          initialBalance: parsed.data,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setInitialBalanceForUser(user.uid, parsed.data);
      setStatus("Initial balance saved.");
    } catch (err) {
      setError("Could not save initial balance.");
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const parsed = incomeSchema.safeParse(formData);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid income form.");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "incomes"), {
        uid: user.uid,
        month: parsed.data.month,
        year: parsed.data.year,
        source: parsed.data.source,
        amount: parsed.data.amount,
        createdAt: serverTimestamp()
      });
      setStatus("Income saved successfully.");
      setFormData((prev) => ({ ...prev, source: "", amount: "" }));
    } catch (err) {
      setError("Failed to save income.");
      console.error(err);
    }
  };

  return (
    <section>
      <h1>Add Income</h1>
      <p className="muted">All records are saved under your own Google user ID.</p>

      <div className="form-grid">
        <div className="form-card">
          <h2>Initial Balance (Mandatory)</h2>
          <div className="field">
            <label htmlFor="initialBalance">Initial Balance</label>
            <input
              id="initialBalance"
              name="initialBalance"
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              placeholder="e.g. 5000"
            />
          </div>
          <button className="btn" onClick={saveInitialBalance}>
            Save Initial Balance
          </button>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>New Income Entry</h2>
          <div className="field">
            <label htmlFor="month">Month</label>
            <select id="month" name="month" value={formData.month} onChange={handleChange}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="year">Year</label>
            <select id="year" name="year" value={formData.year} onChange={handleChange}>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="source">Income Source</label>
            <input
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Salary / Freelance / Bonus"
            />
          </div>
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 1500"
            />
          </div>
          <button className="btn" type="submit">
            Save Income
          </button>
        </form>
      </div>

      {status && <p className="success">{status}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}
