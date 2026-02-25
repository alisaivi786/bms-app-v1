import { useEffect, useState } from "react";
import { z } from "zod";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
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
import { MONTH_OPTIONS } from "../constants/months";

const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 2 + i);
const incomeSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000).max(3000),
  source: z.string().trim().min(1, "Income source is required."),
  amount: z.coerce.number().positive("Amount must be greater than 0.")
});
const accountBalanceSchema = z.coerce
  .number()
  .min(0, "Account balance must be 0 or greater.");

export default function IncomePage() {
  const PAGE_SIZE = 8;
  const { user } = useAuth();
  const userData = useFinanceStore((state) => state.userDataByUid[user.uid]);
  const setAccountBalanceForUser = useFinanceStore((state) => state.setAccountBalanceForUser);
  const setIncomesForUser = useFinanceStore((state) => state.setIncomesForUser);
  const currency = usePreferencesStore((state) => state.currency);
  const now = new Date();
  const [formData, setFormData] = useState({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    source: "",
    amount: ""
  });
  const [accountBalance, setAccountBalance] = useState(
    String(userData?.accountBalance ?? "")
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [incomeSourceOptions, setIncomeSourceOptions] = useState([]);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [page, setPage] = useState(1);
  const incomes = userData?.incomes || [];
  const totalPages = Math.max(1, Math.ceil(incomes.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pagedIncomes = incomes.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    if (userData?.accountBalance !== undefined) {
      setAccountBalance(String(userData.accountBalance));
    }
  }, [userData?.accountBalance]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

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

  const saveAccountBalance = async () => {
    setError("");
    setStatus("");
    const parsed = accountBalanceSchema.safeParse(accountBalance);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid account balance.");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          accountBalance: parsed.data,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setAccountBalanceForUser(user.uid, parsed.data);
      setStatus("Account balance saved.");
    } catch (err) {
      setError("Could not save account balance.");
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
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          accountBalance: increment(parsed.data.amount),
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setAccountBalanceForUser(
        user.uid,
        Number(userData?.accountBalance || 0) + Number(parsed.data.amount)
      );
      setStatus("Income saved successfully.");
      setFormData((prev) => ({ ...prev, source: "", amount: "" }));
      setShowAddIncomeModal(false);
    } catch (err) {
      setError("Failed to save income.");
      console.error(err);
    }
  };

  const deleteIncome = async (incomeId, amount) => {
    setError("");
    setStatus("");
    const numericAmount = Number(amount || 0);
    try {
      await deleteDoc(doc(db, "users", user.uid, "incomes", incomeId));
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          accountBalance: increment(-numericAmount),
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setAccountBalanceForUser(
        user.uid,
        Number(userData?.accountBalance || 0) - numericAmount
      );
      setIncomesForUser(
        user.uid,
        incomes.filter((item) => item.id !== incomeId)
      );
      setStatus("Income deleted and account balance updated.");
    } catch (err) {
      setError("Failed to delete income.");
      console.error(err);
    }
  };

  return (
    <section>
      <h1>Income Grid</h1>
      <p className="muted">
        All records are saved under your own Google user ID. Current currency: {currency}
      </p>

      <div className="form-grid">
        <div className="form-card">
          <h2>Account Balance</h2>
          <div className="field">
            <label htmlFor="accountBalance">Account Balance</label>
            <input
              id="accountBalance"
              name="accountBalance"
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              placeholder="e.g. 5000"
            />
          </div>
          <button className="btn" onClick={saveAccountBalance}>
            Save Account Balance
          </button>
        </div>
        <div className="form-card">
          <h2>Income Actions</h2>
          <button className="btn" type="button" onClick={() => setShowAddIncomeModal(true)}>
            Add Income
          </button>
        </div>
      </div>

      <div className="table-card">
        <h3>Income Grid</h3>
        {incomes.length === 0 ? (
          <p className="muted">No income records yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
              <tbody>
              {pagedIncomes.map((item) => (
                <tr key={item.id}>
                  <td>{MONTH_OPTIONS.find((m) => m.value === Number(item.month))?.label || item.month}</td>
                  <td>{item.year}</td>
                  <td>{item.source}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button
                      className="btn btn-inline btn-outline"
                      type="button"
                      onClick={() => deleteIncome(item.id, item.amount)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {incomes.length > 0 ? (
          <div className="grid-pagination">
            <button
              className="btn btn-inline btn-outline"
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-inline btn-outline"
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      {showAddIncomeModal ? (
        <div className="budget-modal-backdrop">
          <div className="form-card budget-modal-card budget-modal-shell income-modal-shell">
            <h2>Add Income</h2>
            <form className="budget-modal-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="month">Month</label>
                <CustomSelect
                  value={formData.month}
                  onChange={(value) => setField("month", Number(value))}
                  options={MONTH_OPTIONS}
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
              <div className="row-field">
                <button className="btn budget-modal-primary-btn" type="submit">
                  Save Income
                </button>
                <button
                  className="btn btn-outline budget-modal-secondary-btn"
                  type="button"
                  onClick={() => setShowAddIncomeModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />
    </section>
  );
}
