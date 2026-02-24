import { useEffect, useState } from "react";
import { z } from "zod";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";
import { usePreferencesStore } from "../state/preferencesStore";
import { LOOKUP_TYPE_ENUM, getLookupTypeByKey } from "../constants/lookupTypes";
import CustomSelect from "../components/CustomSelect";
import AlertMessage from "../components/AlertMessage";

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
  const currency = usePreferencesStore((state) => state.currency);
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
  const [incomeSourceOptions, setIncomeSourceOptions] = useState([]);

  useEffect(() => {
    if (userData?.initialBalance !== undefined) {
      setInitialBalance(String(userData.initialBalance));
    }
  }, [userData?.initialBalance]);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      const lookupItems = Array.isArray(data.lookupItems) ? data.lookupItems : [];
      const fromLookupItems = lookupItems
        .filter((item) => {
          const typeId = Number(item.typeId);
          const fallbackTypeId = getLookupTypeByKey(String(item.type || ""))?.id || 0;
          const resolvedTypeId = Number.isInteger(typeId) && typeId > 0 ? typeId : fallbackTypeId;
          return resolvedTypeId === LOOKUP_TYPE_ENUM.INCOME_SOURCE;
        })
        .map((item) => ({ id: Number(item.id), name: String(item.name || "") }))
        .filter((item) => Number.isInteger(item.id) && item.name.trim() !== "");

      const legacy = Array.isArray(data.incomeSourceLookups) ? data.incomeSourceLookups : [];
      const fromLegacy = legacy
        .map((name, index) => ({ id: index + 1, name: String(name || "") }))
        .filter((item) => item.name.trim() !== "");

      const merged = [...fromLookupItems];
      fromLegacy.forEach((item) => {
        const exists = merged.some(
          (m) => m.name.toLowerCase().trim() === item.name.toLowerCase().trim()
        );
        if (!exists) merged.push(item);
      });

      const normalized = merged.sort((a, b) => a.name.localeCompare(b.name));
      setIncomeSourceOptions(normalized);
    });
    return unsubscribe;
  }, [user.uid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name, value) => {
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
      <p className="muted">
        All records are saved under your own Google user ID. Current currency: {currency}
      </p>

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
            <CustomSelect
              value={formData.month}
              onChange={(value) => setField("month", Number(value))}
              options={Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
                value: month,
                label: String(month)
              }))}
            />
          </div>
          <div className="field">
            <label htmlFor="year">Year</label>
            <CustomSelect
              value={formData.year}
              onChange={(value) => setField("year", Number(value))}
              options={yearOptions.map((year) => ({
                value: year,
                label: String(year)
              }))}
            />
          </div>
          <div className="field">
            <label htmlFor="source">Income Source</label>
            <CustomSelect
              value={formData.source}
              onChange={(value) => setField("source", value)}
              placeholder="Select source"
              options={incomeSourceOptions.map((item) => ({
                value: item.name,
                label: item.name
              }))}
            />
            {incomeSourceOptions.length === 0 ? (
              <small className="muted">
                No lookup found. Add sources from System Configuration first.
              </small>
            ) : null}
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

      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />
    </section>
  );
}
