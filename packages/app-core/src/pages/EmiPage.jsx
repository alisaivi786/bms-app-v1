import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { z } from "zod";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import AlertMessage from "../components/AlertMessage";
import ConfirmModal from "../components/ConfirmModal";
import CustomSelect from "../components/CustomSelect";
import { LOOKUP_TYPE_ENUM } from "../constants/lookupTypes";
import { MONTH_OPTIONS, monthLabel } from "../constants/months";
import { usePreferencesStore } from "../state/preferencesStore";

const EMI_TYPE_OPTIONS = [
  { value: "loan", label: "Loan" },
  { value: "credit_card", label: "Credit Card" },
  { value: "other", label: "Other" }
];

const emiSchema = z.object({
  title: z.string().trim().min(2, "EMI name is required."),
  type: z.enum(["loan", "credit_card", "other"]),
  monthlyEmi: z.coerce.number().positive("Monthly EMI must be greater than 0."),
  tenorMonths: z.coerce
    .number()
    .int()
    .min(1, "Tenor must be at least 1 month.")
    .max(360, "Tenor cannot exceed 360 months.")
});

const paymentSchema = z.object({
  amount: z.coerce.number().positive("Payment amount must be greater than 0.")
});

function withTimeout(promise, ms, message) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

function addMonths(year, month, offset) {
  const base = new Date(year, month - 1 + offset, 1);
  return { year: base.getFullYear(), month: base.getMonth() + 1 };
}

function budgetCategoryNameForType(type) {
  if (type === "loan") return "Loan";
  if (type === "credit_card") return "Credit Cards";
  return "Other";
}

export default function EmiPage() {
  const { user } = useAuth();
  const currency = usePreferencesStore((state) => state.currency);
  const now = new Date();
  const [lookupItems, setLookupItems] = useState([]);
  const [emis, setEmis] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [pendingRemoveEmi, setPendingRemoveEmi] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "loan",
    monthlyEmi: "",
    tenorMonths: "",
    startMonth: now.getMonth() + 1,
    startYear: now.getFullYear()
  });
  const [paymentAmount, setPaymentAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSavingEmi, setIsSavingEmi] = useState(false);
  const [isRemovingEmi, setIsRemovingEmi] = useState(false);
  const lastSyncedTotalDebtRef = useRef(null);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const normalized = Array.isArray(data.lookupItems)
        ? data.lookupItems
            .map((item) => ({
              id: Number(item.id),
              typeId: Number(item.typeId || 0),
              name: String(item.name || "")
            }))
            .filter((item) => Number.isInteger(item.id) && Number.isInteger(item.typeId) && item.name.trim())
        : [];
      setLookupItems(normalized);
    });
    return unsub;
  }, [user.uid]);

  useEffect(() => {
    const emiRef = query(collection(db, "users", user.uid, "emis"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      emiRef,
      (snapshot) => {
        setEmis(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      },
      () => setEmis([])
    );
    return unsub;
  }, [user.uid]);

  const resolveBudgetCategoryId = (name) => {
    const normalized = String(name || "").trim().toLowerCase();
    const match = lookupItems.find(
      (item) =>
        item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY &&
        String(item.name || "").trim().toLowerCase() === normalized
    );
    return Number(match?.id) || 0;
  };

  const upsertBudgetForEmiPlan = async ({
    emiId,
    title,
    type,
    monthlyEmi,
    tenorMonths,
    startMonth,
    startYear
  }) => {
    const categoryName = budgetCategoryNameForType(type);
    const categoryId = resolveBudgetCategoryId(categoryName);
    const amount = Number(monthlyEmi);
    const months = Number(tenorMonths);

    for (let i = 0; i < months; i += 1) {
      const { year, month } = addMonths(startYear, startMonth, i);
      const key = `${year}-${String(month).padStart(2, "0")}`;
      const budgetRef = doc(db, "users", user.uid, "budgets", key);
      const snap = await withTimeout(
        getDoc(budgetRef),
        15000,
        "Budget read timeout. Please check your connection and try again."
      );
      const existing = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : [];
      const maxId = existing.reduce((max, row) => Math.max(max, Number(row?.id) || 0), 0);
      const row = {
        id: maxId + 1,
        emiId,
        categoryId,
        name: title,
        estimatedAmount: amount,
        actualAmount: 0
      };
      await withTimeout(
        setDoc(
          budgetRef,
          {
            uid: user.uid,
            month,
            year,
            items: [...existing, row],
            updatedAt: serverTimestamp()
          },
          { merge: true }
        ),
        15000,
        "Budget write timeout. Please check your connection and try again."
      );
    }
  };

  const handleCreateEmi = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");
    const parsed = emiSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid EMI form.");
      return;
    }
    // Close modal immediately and save in background.
    setShowAddModal(false);
    setIsSavingEmi(true);
    try {
      const totalPlanned = Number(parsed.data.monthlyEmi) * Number(parsed.data.tenorMonths);
      const emiRef = await withTimeout(
        addDoc(collection(db, "users", user.uid, "emis"), {
          uid: user.uid,
          title: parsed.data.title,
          type: parsed.data.type,
          monthlyEmi: Number(parsed.data.monthlyEmi),
          tenorMonths: Number(parsed.data.tenorMonths),
          startMonth: Number(form.startMonth),
          startYear: Number(form.startYear),
          totalPlanned,
          paidAmount: 0,
          completed: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }),
        15000,
        "EMI save timeout. Please check your connection and try again."
      );
      await upsertBudgetForEmiPlan({
        emiId: emiRef.id,
        title: parsed.data.title,
        type: parsed.data.type,
        monthlyEmi: Number(parsed.data.monthlyEmi),
        tenorMonths: Number(parsed.data.tenorMonths),
        startMonth: Number(form.startMonth),
        startYear: Number(form.startYear)
      });
      setStatus("EMI added and budget estimated entries generated.");
      setForm({
        title: "",
        type: "loan",
        monthlyEmi: "",
        tenorMonths: "",
        startMonth: now.getMonth() + 1,
        startYear: now.getFullYear()
      });
    } catch (err) {
      const code = err?.code || "";
      if (code === "permission-denied" || code === "firestore/permission-denied") {
        setError("Missing or insufficient permissions. Update Firestore rules for EMI and Budget.");
        return;
      }
      setError(err?.message || "Could not create EMI.");
    } finally {
      setIsSavingEmi(false);
    }
  };

  const handleRecordPayment = async (event) => {
    event.preventDefault();
    if (!selectedEmi) return;
    setError("");
    setStatus("");
    const parsed = paymentSchema.safeParse({ amount: paymentAmount });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid payment.");
      return;
    }
    try {
      const amount = Number(parsed.data.amount);
      const nextPaid = Number(selectedEmi.paidAmount || 0) + amount;
      const completed = nextPaid >= Number(selectedEmi.totalPlanned || 0);
      await updateDoc(doc(db, "users", user.uid, "emis", selectedEmi.id), {
        paidAmount: nextPaid,
        completed,
        updatedAt: serverTimestamp()
      });

      // update current month budget actual for this EMI row
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const key = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
      const budgetRef = doc(db, "users", user.uid, "budgets", key);
      const snap = await getDoc(budgetRef);
      const existing = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : [];
      const categoryId = resolveBudgetCategoryId(budgetCategoryNameForType(selectedEmi.type));
      const idx = existing.findIndex(
        (row) =>
          String(row?.emiId || "") === String(selectedEmi.id || "") ||
          (String(row?.name || "").trim().toLowerCase() ===
            String(selectedEmi.title || "").trim().toLowerCase() &&
            Number(row?.categoryId || 0) === Number(categoryId))
      );
      if (idx >= 0) {
        const row = existing[idx];
        const currentActual = Number(row.actualAmount || 0);
        existing[idx] = {
          ...row,
          actualAmount: currentActual + amount
        };
      } else {
        const maxId = existing.reduce((max, row) => Math.max(max, Number(row?.id) || 0), 0);
        existing.push({
          id: maxId + 1,
          emiId: selectedEmi.id,
          categoryId,
          name: selectedEmi.title,
          estimatedAmount: Number(selectedEmi.monthlyEmi || 0),
          actualAmount: amount
        });
      }
      await setDoc(
        budgetRef,
        {
          uid: user.uid,
          month: currentMonth,
          year: currentYear,
          items: existing,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setStatus("Payment recorded and budget actual updated.");
      setShowPaymentModal(false);
      setSelectedEmi(null);
      setPaymentAmount("");
    } catch (err) {
      const code = err?.code || "";
      if (code === "permission-denied" || code === "firestore/permission-denied") {
        setError("Missing or insufficient permissions. Update Firestore rules for EMI and Budget.");
        return;
      }
      setError(err?.message || "Could not record payment.");
    }
  };

  const handleDeleteEmi = async (emi) => {
    if (!emi?.id) return;
    setError("");
    setStatus("");
    setIsRemovingEmi(true);
    try {
      const categoryId = resolveBudgetCategoryId(budgetCategoryNameForType(emi.type));
      const monthlyAmount = Number(emi.monthlyEmi || 0);
      const tenorMonths = Number(emi.tenorMonths || 0);
      const startMonth = Number(emi.startMonth || 0);
      const startYear = Number(emi.startYear || 0);
      const tenorKeys = new Set();
      if (tenorMonths > 0 && startMonth > 0 && startYear > 0) {
        for (let i = 0; i < tenorMonths; i += 1) {
          const { year, month } = addMonths(startYear, startMonth, i);
          tenorKeys.add(`${year}-${String(month).padStart(2, "0")}`);
        }
      }

      const budgetsSnap = await withTimeout(
        getDocs(collection(db, "users", user.uid, "budgets")),
        15000,
        "Budget scan timeout. Please check your connection and try again."
      );
      for (const budgetDoc of budgetsSnap.docs) {
        const data = budgetDoc.data() || {};
        const items = Array.isArray(data.items) ? data.items : [];
        if (items.length === 0) continue;

        const nextItems = items.filter((row) => {
          const isTargetEmi = String(row?.emiId || "") === String(emi.id);
          const isLegacyTarget =
            (tenorKeys.size === 0 || tenorKeys.has(budgetDoc.id)) &&
            String(row?.name || "").trim().toLowerCase() === String(emi.title || "").trim().toLowerCase() &&
            Number(row?.categoryId || 0) === Number(categoryId) &&
            Number(row?.estimatedAmount || 0) === monthlyAmount;
          const matchesTarget = isTargetEmi || isLegacyTarget;
          if (!matchesTarget) return true;
          const actual = Number(row?.actualAmount || 0);
          // Keep paid history; remove only unpaid planned rows.
          return actual > 0;
        });

        if (nextItems.length !== items.length) {
          await withTimeout(
            setDoc(
              doc(db, "users", user.uid, "budgets", budgetDoc.id),
              {
                uid: user.uid,
                month: Number(data.month || 0),
                year: Number(data.year || 0),
                items: nextItems,
                updatedAt: serverTimestamp()
              },
              { merge: true }
            ),
            15000,
            "Budget cleanup timeout. Please check your connection and try again."
          );
        }
      }

      await withTimeout(
        deleteDoc(doc(db, "users", user.uid, "emis", emi.id)),
        15000,
        "EMI remove timeout. Please check your connection and try again."
      );
      setStatus("EMI removed. Unpaid planned rows removed; paid rows kept as history.");
    } catch (err) {
      const code = err?.code || "";
      if (code === "permission-denied" || code === "firestore/permission-denied") {
        setError("Missing or insufficient permissions. Update Firestore rules for EMI and Budget.");
        return;
      }
      setError(err?.message || "Could not remove EMI.");
    } finally {
      setIsRemovingEmi(false);
    }
  };

  const categoryTotals = useMemo(() => {
    const rows = {
      "Credit Cards": 0,
      Loan: 0,
      Other: 0
    };
    const active = emis.filter((item) => !item.completed);
    active.forEach((emi) => {
      const key = budgetCategoryNameForType(emi.type);
      rows[key] += Number(emi.monthlyEmi || 0);
    });
    return rows;
  }, [emis]);

  const totalCount = emis.length;
  const paidCount = emis.filter((item) => item.completed).length;
  const totalDebt = useMemo(
    () =>
      emis.reduce(
        (sum, emi) => sum + Number(emi.totalPlanned || Number(emi.monthlyEmi || 0) * Number(emi.tenorMonths || 0)),
        0
      ),
    [emis]
  );
  const paidDebt = useMemo(
    () => emis.reduce((sum, emi) => sum + Number(emi.paidAmount || 0), 0),
    [emis]
  );
  const remainingDebt = useMemo(
    () => Math.max(0, totalDebt - paidDebt),
    [paidDebt, totalDebt]
  );

  useEffect(() => {
    const syncDebt = async () => {
      const snapshotKey = `${totalDebt}|${paidDebt}|${remainingDebt}`;
      if (lastSyncedTotalDebtRef.current === snapshotKey) return;
      lastSyncedTotalDebtRef.current = snapshotKey;
      try {
        await withTimeout(
          setDoc(
            doc(db, "users", user.uid),
            {
              uid: user.uid,
              totalDebt,
              paidDebt,
              remainingDebt,
              updatedAt: serverTimestamp()
            },
            { merge: true }
          ),
          10000,
          "Could not sync total debt to profile."
        );
      } catch (err) {
        console.error("Could not sync total debt", err);
      }
    };
    syncDebt();
  }, [paidDebt, remainingDebt, totalDebt, user.uid]);

  return (
    <section>
      <h1>EMI</h1>
      <p className="muted">
        Manage loan and credit card EMI plans, then record actual payments with flexible amount.
      </p>
      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />

      <div className="budget-layout">
        <div className="budget-main">
          <div className="form-card">
            <div className="emi-top-stats">
              <div className="emi-top-stat">
                <span>Total Debt</span>
                <strong>
                  {currency} {totalDebt.toFixed(2)}
                </strong>
              </div>
              <div className="emi-top-stat">
                <span>Paid Debt</span>
                <strong>
                  {currency} {paidDebt.toFixed(2)}
                </strong>
              </div>
              <div className="emi-top-stat">
                <span>Remaining Debt</span>
                <strong>
                  {currency} {remainingDebt.toFixed(2)}
                </strong>
              </div>
            </div>
            <button className="btn budget-open-btn" type="button" onClick={() => setShowAddModal(true)}>
              Add EMI
            </button>
          </div>

          <div className="cards">
            {emis.map((emi) => {
              const remaining = Math.max(0, Number(emi.totalPlanned || 0) - Number(emi.paidAmount || 0));
              return (
                <article className="card emi-card" key={emi.id}>
                  <div className="emi-card-head">
                    <h2>{emi.title}</h2>
                    <span className={`emi-type-badge emi-type-${emi.type}`}>{emi.type.replace("_", " ")}</span>
                  </div>
                  <p className="emi-amount">
                    {currency} {Number(emi.monthlyEmi || 0).toFixed(2)}
                  </p>
                  <div className="emi-meta-grid">
                    <div className="emi-meta-row">
                      <span>Tenor</span>
                      <strong>{emi.tenorMonths} months</strong>
                    </div>
                    <div className="emi-meta-row">
                      <span>Start</span>
                      <strong>
                        {monthLabel(emi.startMonth)} {emi.startYear}
                      </strong>
                    </div>
                    <div className="emi-meta-row">
                      <span>Paid</span>
                      <strong>
                        {currency} {Number(emi.paidAmount || 0).toFixed(2)}
                      </strong>
                    </div>
                    <div className="emi-meta-row">
                      <span>Remaining</span>
                      <strong>
                        {currency} {remaining.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                  <div className="role-detail-actions">
                    <button
                      className="btn btn-inline"
                      type="button"
                      disabled={emi.completed}
                      onClick={() => {
                        setSelectedEmi(emi);
                        setPaymentAmount(String(Number(emi.monthlyEmi || 0)));
                        setShowPaymentModal(true);
                      }}
                    >
                      {emi.completed ? "Completed" : "Record Payment"}
                    </button>
                    <button
                      className="btn btn-inline btn-outline"
                      type="button"
                      onClick={() => setPendingRemoveEmi(emi)}
                    >
                      Remvoe
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="table-card budget-summary">
          <h3 className="budget-summary-title">EMI Category Totals</h3>
          <p className="budget-summary-subtitle">Current month planned totals by category.</p>
          <div className="budget-summary-list">
            {Object.entries(categoryTotals).map(([name, amount]) => (
              <div className="budget-summary-item" key={name}>
                <strong>{name}</strong>
                <span>
                  {currency} {Number(amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="budget-total">
            <strong>EMI Count</strong>
            <p>
              {paidCount} paid / {totalCount} total
            </p>
          </div>
        </aside>
      </div>

      {showAddModal ? (
        <div className="budget-modal-backdrop">
          <div className="form-card budget-modal-card budget-modal-shell">
            <h2>Add EMI</h2>
            <form className="budget-modal-form" onSubmit={handleCreateEmi}>
              <div className="field">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Credit Card 1"
                />
              </div>
              <div className="field">
                <label>Type</label>
                <CustomSelect
                  value={form.type}
                  onChange={(value) => setForm((prev) => ({ ...prev, type: value }))}
                  options={EMI_TYPE_OPTIONS}
                />
              </div>
              <div className="field">
                <label>Monthly EMI</label>
                <input
                  type="number"
                  value={form.monthlyEmi}
                  onChange={(e) => setForm((prev) => ({ ...prev, monthlyEmi: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Tenor (Months)</label>
                <input
                  type="number"
                  value={form.tenorMonths}
                  onChange={(e) => setForm((prev) => ({ ...prev, tenorMonths: e.target.value }))}
                />
              </div>
              <div className="field">
                <label>Start Month</label>
                <CustomSelect
                  value={form.startMonth}
                  onChange={(value) => setForm((prev) => ({ ...prev, startMonth: Number(value) }))}
                  options={MONTH_OPTIONS}
                />
              </div>
              <div className="field">
                <label>Start Year</label>
                <input
                  type="number"
                  value={form.startYear}
                  onChange={(e) => setForm((prev) => ({ ...prev, startYear: Number(e.target.value) }))}
                />
              </div>
              <div className="row-field">
                <button className="btn budget-modal-primary-btn" type="submit">
                  Save EMI
                </button>
                <button
                  className="btn btn-outline budget-modal-secondary-btn"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showPaymentModal && selectedEmi ? (
        <div className="budget-modal-backdrop">
          <div className="form-card budget-modal-card budget-modal-shell budget-category-modal-shell">
            <h2>Record EMI Payment</h2>
            <p className="muted">{selectedEmi.title}</p>
            <form onSubmit={handleRecordPayment}>
              <div className="field">
                <label>Payment Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <div className="row-field">
                <button className="btn budget-modal-primary-btn" type="submit">
                  Record
                </button>
                <button
                  className="btn btn-outline budget-modal-secondary-btn"
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedEmi(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={Boolean(pendingRemoveEmi)}
        title="Confirm Remove"
        message={
          pendingRemoveEmi
            ? `Do you want to remove ${pendingRemoveEmi.title}? Unpaid planned rows will be removed, paid rows will be kept as history.`
            : ""
        }
        confirmText="Remvoe"
        cancelText="Cancel"
        onConfirm={async () => {
          const target = pendingRemoveEmi;
          setPendingRemoveEmi(null);
          await handleDeleteEmi(target);
        }}
        onCancel={() => setPendingRemoveEmi(null)}
      />

      {isSavingEmi || isRemovingEmi ? (
        <div className="saving-overlay" role="status" aria-live="polite" aria-busy="true">
          <div className="saving-overlay-card">
            <div className="saving-spinner" />
            <p>
              {isRemovingEmi
                ? "Removing EMI and cleaning pending budget rows..."
                : "Saving EMI and generating budget rows..."}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
