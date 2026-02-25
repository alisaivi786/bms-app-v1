import { useEffect, useMemo, useRef, useState } from "react";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { z } from "zod";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { usePreferencesStore } from "../state/preferencesStore";
import AlertMessage from "../components/AlertMessage";
import CustomSelect from "../components/CustomSelect";
import { DEFAULT_BUDGET_CATEGORY_LOOKUPS, LOOKUP_TYPE_ENUM } from "../constants/lookupTypes";
import { MONTH_OPTIONS, monthLabel } from "../constants/months";

const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 2 + i);

const budgetRowSchema = z.object({
  name: z.string().trim().min(1, "Column name is required."),
  estimatedAmount: z.coerce.number().min(0, "Estimated amount must be 0 or greater."),
  actualAmount: z.coerce.number().min(0, "Actual amount must be 0 or greater.")
});

function toNumber(value) {
  const normalized = String(value ?? "")
    .replace(/,/g, "")
    .trim();
  if (!normalized) return 0;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function makeRuntimeRowKey() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function displayBudgetCategoryName(name) {
  return String(name || "").trim().toLowerCase() === "credit cards" ? "EMI" : String(name || "");
}

function normalizeBudgetCategoryForMatch(name) {
  const normalized = String(name || "").trim().toLowerCase();
  if (normalized === "emi") return "credit cards";
  return normalized;
}

export default function BudgetPage() {
  const { user } = useAuth();
  const currency = usePreferencesStore((state) => state.currency);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [items, setItems] = useState([]);
  const [lookupItems, setLookupItems] = useState([]);
  const [newCategory, setNewCategory] = useState(DEFAULT_BUDGET_CATEGORY_LOOKUPS[0]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEstimatedAmount, setNewEstimatedAmount] = useState("");
  const [newActualAmount, setNewActualAmount] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPredefined, setIsPredefined] = useState(false);
  const [predefinedYear, setPredefinedYear] = useState(now.getFullYear());
  const [predefinedMonths, setPredefinedMonths] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const seededBudgetCategoriesRef = useRef(false);
  const [lookupLoaded, setLookupLoaded] = useState(false);

  const budgetKey = `${year}-${String(month).padStart(2, "0")}`;
  const userRef = doc(db, "users", user.uid);

  const getNextBudgetItemId = (rows) =>
    rows.reduce((max, item) => {
      const idAsNumber = Number(item?.id);
      return Number.isInteger(idAsNumber) ? Math.max(max, idAsNumber) : max;
    }, 0) + 1;

  const normalizeLookupItems = (items) =>
    (Array.isArray(items) ? items : [])
      .map((item) => ({
        id: Number(item.id),
        typeId: Number(item.typeId || 0),
        name: String(item.name || "")
      }))
      .filter(
        (item) =>
          Number.isInteger(item.id) &&
          Number.isInteger(item.typeId) &&
          item.typeId > 0 &&
          item.name.trim()
      );

  const loadLatestLookupItems = async () => {
    const snap = await getDoc(userRef);
    const data = snap.exists() ? snap.data() : {};
    return normalizeLookupItems(data.lookupItems);
  };

  const resolveCategoryName = (categoryId, fallback = "Other") => {
    const id = Number(categoryId);
    if (!Number.isInteger(id) || id <= 0) return fallback;
    const match = lookupItems.find(
      (item) => item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY && Number(item.id) === id
    );
    return displayBudgetCategoryName(String(match?.name || fallback));
  };

  const resolveCategoryId = (categoryName) => {
    const normalized = normalizeBudgetCategoryForMatch(categoryName);
    if (!normalized) return 0;
    const match = lookupItems.find(
      (item) =>
        item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY &&
        normalizeBudgetCategoryForMatch(item.name) === normalized
    );
    return Number(match?.id) || 0;
  };

  const ensureBudgetCategoryIds = async (rows) => {
    const latestLookupItems = await loadLatestLookupItems();
    let nextLookupItems = [...latestLookupItems];
    let lookupChanged = false;
    let maxId = nextLookupItems.reduce(
      (max, item) => (Number.isInteger(item.id) ? Math.max(max, item.id) : max),
      0
    );

    const getOrCreateCategoryId = (name) => {
      const normalizedName = String(name || "Other").trim();
      const existing = nextLookupItems.find(
        (item) =>
          item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY &&
          String(item.name || "").trim().toLowerCase() === normalizedName.toLowerCase()
      );
      if (existing) return Number(existing.id) || 0;
      maxId += 1;
      const created = {
        id: maxId,
        typeId: LOOKUP_TYPE_ENUM.BUDGET_CATEGORY,
        name: normalizedName
      };
      nextLookupItems.push(created);
      lookupChanged = true;
      return created.id;
    };

    const preparedRows = rows.map((item) => ({
      ...item,
      categoryId: Number(item.categoryId) || getOrCreateCategoryId(item.category || "Other")
    }));

    if (lookupChanged) {
      await setDoc(
        userRef,
        {
          uid: user.uid,
          lookupItems: nextLookupItems,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setLookupItems(nextLookupItems);
    }

    return preparedRows;
  };

  const normalizeBudgetItemsForSave = (rows) =>
    (() => {
      const seenIds = new Set();
      let nextId = rows.reduce((max, item) => {
        const id = Number(item?.id);
        return Number.isInteger(id) ? Math.max(max, id) : max;
      }, 0);
      return rows.map((item) => {
      const parsed = budgetRowSchema.safeParse({
        name: item.name,
        estimatedAmount: toNumber(item.estimatedAmount),
        actualAmount: toNumber(item.actualAmount)
      });
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || "Invalid budget row.");
      }
      const derivedCategoryId =
        Number(item.categoryId) || resolveCategoryId(item.category) || 0;
      let normalizedId = Number(item.id) || 0;
      if (!Number.isInteger(normalizedId) || normalizedId <= 0 || seenIds.has(normalizedId)) {
        nextId += 1;
        normalizedId = nextId;
      }
      seenIds.add(normalizedId);
      return {
        id: normalizedId,
        emiId: item.emiId ? String(item.emiId) : null,
        categoryId: Number(derivedCategoryId),
        name: parsed.data.name,
        estimatedAmount: Number(parsed.data.estimatedAmount),
        actualAmount: Number(parsed.data.actualAmount)
      };
    });
    })();

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      const normalized = normalizeLookupItems(data.lookupItems);
      setLookupItems(normalized);
      setLookupLoaded(true);
    });
    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    if (seededBudgetCategoriesRef.current) return;
    if (!lookupLoaded) return;
    if (!Array.isArray(lookupItems)) return;

    const existingBudgetCategories = lookupItems.filter(
      (item) => item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY
    );
    if (existingBudgetCategories.length > 0) return;

    const seedDefaults = async () => {
      try {
        const maxId = lookupItems.reduce(
          (max, item) => (Number.isInteger(item.id) ? Math.max(max, item.id) : max),
          0
        );
        const seeded = DEFAULT_BUDGET_CATEGORY_LOOKUPS.map((name, index) => ({
          id: maxId + index + 1,
          typeId: LOOKUP_TYPE_ENUM.BUDGET_CATEGORY,
          name
        }));
        await setDoc(
          userRef,
          {
            uid: user.uid,
            lookupItems: [...lookupItems, ...seeded],
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
        seededBudgetCategoriesRef.current = true;
      } catch (err) {
        console.error("Could not seed budget categories", err);
      }
    };

    seedDefaults();
  }, [lookupItems, lookupLoaded, user.uid]);

  useEffect(() => {
    const ref = doc(db, "users", user.uid, "budgets", budgetKey);
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.exists() ? snapshot.data() : {};
        setItems((prev) => {
          const normalized = Array.isArray(data.items)
            ? data.items.map((item, index) => {
                const resolvedId = Number(item.id) || index + 1;
                const resolvedCategoryId =
                  Number(item.categoryId) || resolveCategoryId(String(item.category || "")) || 0;
                const prevMatch = prev.find((p) => Number(p.id) === resolvedId);
                const fallbackName =
                  prevMatch?.category ||
                  String(item.category || "").trim() ||
                  "Other";
                return {
                  _rowKey: prevMatch?._rowKey || makeRuntimeRowKey(),
                  id: resolvedId,
                  emiId: item.emiId ? String(item.emiId) : null,
                  categoryId: resolvedCategoryId,
                  category: resolveCategoryName(resolvedCategoryId, fallbackName),
                  name: String(item.name || ""),
                  estimatedAmount: item.estimatedAmount == null ? "" : String(item.estimatedAmount),
                  actualAmount: item.actualAmount == null ? "" : String(item.actualAmount)
                };
              })
            : [];
          return normalized;
        });
        setError("");
      },
      (err) => {
        setError(err?.message || "Could not load budget details.");
      }
    );
    return unsubscribe;
  }, [budgetKey, user.uid]);

  useEffect(() => {
    if (lookupItems.length === 0) return;
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        category: resolveCategoryName(
          item.categoryId,
          item.category || "Other"
        )
      }))
    );
  }, [lookupItems]);

  const saveItems = async (nextItems, nextStatus = "Budget updated.") => {
    try {
      const currentBudgetSnap = await getDoc(doc(db, "users", user.uid, "budgets", budgetKey));
      const currentBudgetItems =
        currentBudgetSnap.exists() && Array.isArray(currentBudgetSnap.data().items)
          ? currentBudgetSnap.data().items
          : [];
      const rowsWithCategoryIds = await ensureBudgetCategoryIds(nextItems);
      const normalizedItems = normalizeBudgetItemsForSave(rowsWithCategoryIds);

      const sumActualByEmiId = (rows) =>
        rows.reduce((acc, row) => {
          const emiId = String(row?.emiId || "").trim();
          if (!emiId) return acc;
          const amount = toNumber(row?.actualAmount);
          if (!Number.isFinite(amount)) return acc;
          acc.set(emiId, (acc.get(emiId) || 0) + amount);
          return acc;
        }, new Map());

      const before = sumActualByEmiId(currentBudgetItems);
      const after = sumActualByEmiId(normalizedItems);
      const affectedEmiIds = new Set([...before.keys(), ...after.keys()]);

      await setDoc(
        doc(db, "users", user.uid, "budgets", budgetKey),
        {
          uid: user.uid,
          month,
          year,
          items: normalizedItems,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      for (const emiId of affectedEmiIds) {
        const delta = (after.get(emiId) || 0) - (before.get(emiId) || 0);
        if (!delta) continue;
        try {
          const emiRef = doc(db, "users", user.uid, "emis", emiId);
          const emiSnap = await getDoc(emiRef);
          if (!emiSnap.exists()) continue;
          const emiData = emiSnap.data() || {};
          const currentPaid = Number(emiData.paidAmount || 0);
          const totalPlanned = Number(emiData.totalPlanned || 0);
          const nextPaid = Math.max(0, currentPaid + delta);
          await updateDoc(emiRef, {
            paidAmount: nextPaid,
            completed: nextPaid >= totalPlanned,
            updatedAt: serverTimestamp()
          });
        } catch (syncErr) {
          console.error("Could not sync EMI payment from budget update", syncErr);
        }
      }

      setStatus(nextStatus);
      setError("");
    } catch (err) {
      setError(err?.message || "Could not save budget.");
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");

    const parsed = budgetRowSchema.safeParse({
      name: newName,
      estimatedAmount: newEstimatedAmount,
      actualAmount: newActualAmount
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid budget row.");
      return;
    }

    const newItem = {
      id: getNextBudgetItemId(items),
      categoryId: resolveCategoryId(newCategory),
      category: newCategory,
      name: parsed.data.name,
      estimatedAmount: String(parsed.data.estimatedAmount),
      actualAmount: String(parsed.data.actualAmount)
    };

    if (isPredefined) {
      if (predefinedMonths.length === 0) {
        setError("Select at least one month for predefined budget.");
        return;
      }
      try {
        for (const targetMonth of predefinedMonths) {
          const targetKey = `${predefinedYear}-${String(targetMonth).padStart(2, "0")}`;
          const targetRef = doc(db, "users", user.uid, "budgets", targetKey);
          const snap = await getDoc(targetRef);
          const existing = snap.exists() && Array.isArray(snap.data().items) ? snap.data().items : [];
          const mergedWithCategoryIds = await ensureBudgetCategoryIds([
            ...existing,
            { ...newItem, id: getNextBudgetItemId(existing), categoryId: resolveCategoryId(newCategory) }
          ]);
          const merged = normalizeBudgetItemsForSave(mergedWithCategoryIds);

          await setDoc(
            targetRef,
            {
              uid: user.uid,
              month: targetMonth,
              year: predefinedYear,
              items: merged,
              updatedAt: serverTimestamp()
            },
            { merge: true }
          );
        }
        setStatus("Predefined budget saved for selected months.");
        setError("");
      } catch (err) {
        setError("Could not save predefined budget.");
        return;
      }
    } else {
      const next = [
        ...items,
        {
          ...newItem
        }
      ];
      await saveItems(next, "Budget row added.");
    }

    setNewName("");
    setNewEstimatedAmount("");
    setNewActualAmount("");
    setIsPredefined(false);
    setPredefinedYear(currentYear);
    setPredefinedMonths([]);
    setShowAddModal(false);
  };

  const availablePredefinedMonths = useMemo(() => {
    const startMonth = predefinedYear === currentYear ? currentMonth : 1;
    return Array.from({ length: 12 - startMonth + 1 }, (_, i) => startMonth + i);
  }, [currentMonth, currentYear, predefinedYear]);

  useEffect(() => {
    setPredefinedMonths((prev) => prev.filter((m) => availablePredefinedMonths.includes(m)));
  }, [availablePredefinedMonths]);

  const togglePredefinedMonth = (targetMonth) => {
    setPredefinedMonths((prev) =>
      prev.includes(targetMonth) ? prev.filter((item) => item !== targetMonth) : [...prev, targetMonth]
    );
  };

  const addQuickRow = async (category) => {
    const next = [
      ...items,
      {
        id: getNextBudgetItemId(items),
        categoryId: resolveCategoryId(category),
        category,
        name: "New Item",
        estimatedAmount: "",
        actualAmount: ""
      }
    ];
    await saveItems(next, `New row added in ${category}.`);
  };

  const addCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setError("Category name is required.");
      return;
    }
    const exists = categories.some((item) => item.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setError("Category already exists.");
      return;
    }
    try {
      const latestLookupItems = await loadLatestLookupItems();
      const maxId = latestLookupItems.reduce(
        (max, item) => (Number.isInteger(item.id) ? Math.max(max, item.id) : max),
        0
      );
      const nextLookupItems = [
        ...latestLookupItems,
        {
          id: maxId + 1,
          typeId: LOOKUP_TYPE_ENUM.BUDGET_CATEGORY,
          name: trimmed
        }
      ];
      await setDoc(
        userRef,
        {
          uid: user.uid,
          lookupItems: nextLookupItems,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
      setNewCategory(trimmed);
      setNewCategoryName("");
      setShowCategoryModal(false);
      setStatus("Budget category added.");
      setError("");
    } catch (err) {
      setError("Could not add category.");
    }
  };

  const updateItemField = (rowKey, key, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item._rowKey === rowKey
          ? {
              ...item,
              [key]: value
            }
          : item
      )
    );
  };

  const persistItem = async (rowKey) => {
    const target = items.find((item) => item._rowKey === rowKey);
    const parsed = budgetRowSchema.safeParse({
      name: target?.name || "",
      estimatedAmount: target?.estimatedAmount ?? 0,
      actualAmount: target?.actualAmount ?? 0
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Invalid budget row.");
      return;
    }
    await saveItems(items, "Budget row updated.");
  };

  const deleteItem = async (rowKey) => {
    const next = items.filter((item) => item._rowKey !== rowKey);
    await saveItems(next, "Budget row deleted.");
  };

  const categories = useMemo(() => {
    const lookupCategories = lookupItems
      .filter((item) => item.typeId === LOOKUP_TYPE_ENUM.BUDGET_CATEGORY)
      .map((item) => displayBudgetCategoryName(item.name.trim()))
      .filter(Boolean);
    const dynamicByResolvedId = [
      ...new Set(
        items
          .map((item) => resolveCategoryName(item.categoryId, String(item.category || "Other")).trim())
          .filter((name) => name && !/^Category\s+\d+$/i.test(name))
      )
    ];
    const merged = DEFAULT_BUDGET_CATEGORY_LOOKUPS.map((name) => displayBudgetCategoryName(name));
    lookupCategories.forEach((name) => {
      if (!merged.includes(name)) merged.push(name);
    });
    dynamicByResolvedId.forEach((name) => {
      if (!merged.includes(name)) merged.push(name);
    });
    return merged;
  }, [items, lookupItems]);

  const itemsWithCategoryName = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        categoryName: resolveCategoryName(item.categoryId, String(item.category || "Other"))
      })),
    [items, lookupItems]
  );

  const grouped = useMemo(
    () =>
      categories.map((category) => ({
        category,
        rows: itemsWithCategoryName.filter((item) => item.categoryName === category)
      })),
    [categories, itemsWithCategoryName]
  );

  const summaryRows = useMemo(
    () =>
      categories.map((category) => {
        const rows = itemsWithCategoryName.filter((item) => item.categoryName === category);
        const estimated = rows.reduce((sum, row) => sum + (toNumber(row.estimatedAmount) || 0), 0);
        return {
          category,
          estimated
        };
      }),
    [categories, itemsWithCategoryName]
  );

  const totals = useMemo(
    () => ({
      estimated: summaryRows.reduce((sum, row) => sum + row.estimated, 0)
    }),
    [summaryRows]
  );

  return (
    <section>
      <h1>Budget</h1>
      <p className="muted">Plan and track category budgets by month and year. Currency: {currency}</p>
      <AlertMessage type="success" message={status} />
      <AlertMessage type="error" message={error} />

      <div className="budget-layout">
        <div className="budget-main">
          <div className="form-card">
            <h2>Budget Filters</h2>
            <div className="form-grid">
              <div className="field">
                <label>Month</label>
                <CustomSelect
                  value={month}
                  onChange={(value) => setMonth(Number(value))}
                  options={MONTH_OPTIONS}
                />
              </div>
              <div className="field">
                <label>Year</label>
                <CustomSelect
                  value={year}
                  onChange={(value) => setYear(Number(value))}
                  options={yearOptions.map((y) => ({ value: y, label: String(y) }))}
                />
              </div>
            </div>
            <div className="row-field budget-filter-actions">
              <button className="btn budget-open-btn" type="button" onClick={() => setShowAddModal(true)}>
                Add Budget
              </button>
              <button
                className="btn budget-category-open-btn"
                type="button"
                onClick={() => setShowCategoryModal(true)}
              >
                Add Category
              </button>
            </div>
          </div>

          {grouped.map((section) => (
            <div className="table-card" key={section.category}>
              <div className="role-grid-toolbar">
                <h3>{section.category}</h3>
                <button
                  className="btn btn-inline"
                  type="button"
                  onClick={() => addQuickRow(section.category)}
                >
                  Add Row
                </button>
              </div>
              {section.rows.length === 0 ? (
                <p className="muted">No rows yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Estimated Amount</th>
                      <th>Actual Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={row._rowKey}>
                        <td>
                          <input
                            value={row.name}
                            onChange={(event) => updateItemField(row._rowKey, "name", event.target.value)}
                            onBlur={() => persistItem(row._rowKey)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.estimatedAmount}
                            onChange={(event) =>
                              updateItemField(row._rowKey, "estimatedAmount", event.target.value)
                            }
                            onBlur={() => persistItem(row._rowKey)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.actualAmount}
                            onChange={(event) =>
                              updateItemField(row._rowKey, "actualAmount", event.target.value)
                            }
                            onBlur={() => persistItem(row._rowKey)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-inline btn-outline"
                            type="button"
                            onClick={() => deleteItem(row._rowKey)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>

        <aside className="table-card budget-summary">
          <h3 className="budget-summary-title">Category Totals</h3>
          <p className="budget-summary-subtitle">Estimated spend by category for selected month.</p>
          <div className="budget-summary-list">
            {summaryRows.map((row) => (
              <div className="budget-summary-item" key={row.category}>
                <strong>{row.category}</strong>
                <span>{currency} {row.estimated.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="budget-total">
            <strong>Total Estimated</strong>
            <p>{currency} {totals.estimated.toFixed(2)}</p>
          </div>
        </aside>
      </div>

      {showAddModal ? (
        <div className="budget-modal-backdrop">
          <div className="form-card budget-modal-card budget-modal-shell">
            <h2>Add Budget Row</h2>
            <form className="budget-modal-form" onSubmit={handleAddItem}>
              <div className="form-grid">
                <div className="field">
                  <label>Category</label>
                  <CustomSelect
                    value={newCategory}
                    onChange={setNewCategory}
                    options={categories.map((item) => ({ value: item, label: item }))}
                  />
                </div>
                <div className="field">
                  <label>Column Name</label>
                  <input
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="e.g. Rental Income"
                  />
                </div>
                <div className="field">
                  <label>Estimated Amount</label>
                  <input
                    type="text"
                    value={newEstimatedAmount}
                    onChange={(event) => setNewEstimatedAmount(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Actual Amount</label>
                  <input
                    type="text"
                    value={newActualAmount}
                    onChange={(event) => setNewActualAmount(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label>
                  <input
                    type="checkbox"
                    checked={isPredefined}
                    onChange={(event) => setIsPredefined(event.target.checked)}
                  />{" "}
                  Predefined Budget (save to multiple months)
                </label>
              </div>
              {isPredefined ? (
                <div className="form-card budget-predefined-card">
                  <div className="field">
                    <label>Year</label>
                    <CustomSelect
                      value={predefinedYear}
                      onChange={(value) => setPredefinedYear(Number(value))}
                      options={yearOptions.map((y) => ({ value: y, label: String(y) }))}
                    />
                  </div>
                  <div className="field">
                    <label>Select Months</label>
                    <div className="month-check-grid">
                      {availablePredefinedMonths.map((m) => (
                        <label key={m} className="month-check-item">
                          <input
                            type="checkbox"
                            checked={predefinedMonths.includes(m)}
                            onChange={() => togglePredefinedMonth(m)}
                          />
                          <span>{monthLabel(m)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="row-field">
                <button className="btn budget-modal-primary-btn" type="submit">
                  Add Budget
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

      {showCategoryModal ? (
        <div className="budget-modal-backdrop">
          <div className="form-card budget-modal-card budget-modal-shell budget-category-modal-shell">
            <h2>Add Category</h2>
            <div className="field">
              <label>Category Name</label>
              <input
                value={newCategoryName}
                onChange={(event) => setNewCategoryName(event.target.value)}
                placeholder="e.g. Education, Travel, Health"
              />
            </div>
            <div className="row-field">
              <button className="btn budget-modal-primary-btn" type="button" onClick={addCategory}>
                Save Category
              </button>
              <button
                className="btn btn-outline budget-modal-secondary-btn"
                type="button"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
