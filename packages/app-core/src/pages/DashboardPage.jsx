import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import CustomSelect from "../components/CustomSelect";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";
import { usePreferencesStore } from "../state/preferencesStore";
import { formatCurrency } from "../utils/currency";
import { MONTH_OPTIONS, monthLabel } from "../constants/months";
import { formatAsGstDateTime } from "../utils/dateTime";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function monthIndex(year, month) {
  return Number(year) * 12 + (Number(month) - 1);
}

function BarsChartCard({ title, rows, currency }) {
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 54, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const max = Math.max(1, ...rows.map((item) => item.value));
  const barWidth = rows.length > 0 ? Math.max(10, chartWidth / rows.length - 10) : 10;
  return (
    <div className="table-card admin-chart-card">
      <h3>{title}</h3>
      {rows.length === 0 ? (
        <p className="muted">No data found.</p>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="260" role="img" aria-label={title}>
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="var(--app-border)"
          />
          {rows.map((item, index) => {
            const x = padding.left + index * (chartWidth / rows.length) + 6;
            const ratio = item.value / max;
            const barHeight = Math.max(2, ratio * chartHeight);
            const y = padding.top + chartHeight - barHeight;
            return (
              <g key={item.label}>
                <rect x={x} y={y} width={barWidth} height={barHeight} fill="var(--app-button)" rx="4" />
                <text
                  x={x + barWidth / 2}
                  y={Math.max(12, y - 6)}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--app-text)"
                >
                  {formatCurrency(item.value, currency)}
                </text>
                <text x={x + barWidth / 2} y={padding.top + chartHeight + 16} textAnchor="middle" fontSize="10" fill="var(--app-muted)">
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

function LineChartCard({ title, rows, currency }) {
  const [activePoint, setActivePoint] = useState(null);
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 54, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const max = Math.max(1, ...rows.map((item) => item.value));
  const step = rows.length > 1 ? chartWidth / (rows.length - 1) : chartWidth;
  const points = rows
    .map((item, index) => {
      const x = padding.left + index * step;
      const y = padding.top + chartHeight - (item.value / max) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="table-card admin-chart-card">
      <h3>{title}</h3>
      {rows.length === 0 ? (
        <p className="muted">No data found.</p>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="260" role="img" aria-label={title}>
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="var(--app-border)"
          />
          <polyline fill="none" stroke="var(--app-accent)" strokeWidth="3" points={points} />
          {rows.map((item, index) => {
            const x = padding.left + index * step;
            const y = padding.top + chartHeight - (item.value / max) * chartHeight;
            const tooltipX = Math.min(width - 140, Math.max(10, x - 64));
            const tooltipY = Math.max(8, y - 48);
            return (
              <g key={item.label}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--app-button)"
                  onMouseEnter={() =>
                    setActivePoint({
                      x: tooltipX,
                      y: tooltipY,
                      label: item.label,
                      value: item.value
                    })
                  }
                  onMouseLeave={() => setActivePoint(null)}
                />
                <text x={x} y={padding.top + chartHeight + 16} textAnchor="middle" fontSize="10" fill="var(--app-muted)">
                  {item.label}
                </text>
              </g>
            );
          })}
          {activePoint ? (
            <g pointerEvents="none">
              <rect
                x={activePoint.x}
                y={activePoint.y}
                width="128"
                height="34"
                rx="6"
                fill="var(--app-card-bg)"
                stroke="var(--app-border)"
              />
              <text x={activePoint.x + 8} y={activePoint.y + 14} fontSize="10" fill="var(--app-muted)">
                {activePoint.label}
              </text>
              <text x={activePoint.x + 8} y={activePoint.y + 27} fontSize="11" fontWeight="700" fill="var(--app-text)">
                {formatCurrency(activePoint.value, currency)}
              </text>
            </g>
          ) : null}
        </svg>
      )}
    </div>
  );
}

function DonutChartCard({ title, rows, currency }) {
  const cx = 110;
  const cy = 110;
  const radius = 74;
  const total = Math.max(1, rows.reduce((sum, item) => sum + item.value, 0));
  let offset = 0;
  const colors = ["#0ea5e9", "#f59e0b", "#22c55e", "#ef4444", "#8b5cf6", "#14b8a6"];
  return (
    <div className="table-card admin-chart-card">
      <h3>{title}</h3>
      {rows.length === 0 ? (
        <p className="muted">No data found.</p>
      ) : (
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label={title}>
            {rows.map((item, index) => {
              const fraction = item.value / total;
              const dash = 2 * Math.PI * radius;
              const dashLen = fraction * dash;
              const circle = (
                <circle
                  key={item.label}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="24"
                  strokeDasharray={`${dashLen} ${dash - dashLen}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${cx} ${cy})`}
                />
              );
              offset += dashLen;
              return circle;
            })}
            <circle cx={cx} cy={cy} r="54" fill="var(--app-card-bg)" />
            <text x={cx} y={cy} textAnchor="middle" fontSize="13" fill="var(--app-muted)">
              Total
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--app-text)">
              {formatCurrency(total, currency)}
            </text>
          </svg>
          <div style={{ display: "grid", gap: 8 }}>
            {rows.map((item, index) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: colors[index % colors.length] }} />
                <span className="muted">{item.label}</span>
                <strong>{formatCurrency(item.value, currency)}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const userData = useFinanceStore((state) => state.userDataByUid[user.uid]);
  const currency = usePreferencesStore((state) => state.currency);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [budgetDocs, setBudgetDocs] = useState([]);
  const [emis, setEmis] = useState([]);
  const accountBalance = Number(userData?.accountBalance || 0);
  const incomes = userData?.incomes || [];

  useEffect(() => {
    const unsubBudgets = onSnapshot(collection(db, "users", user.uid, "budgets"), (snapshot) => {
      setBudgetDocs(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    });
    const unsubEmis = onSnapshot(collection(db, "users", user.uid, "emis"), (snapshot) => {
      setEmis(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    });
    return () => {
      unsubBudgets();
      unsubEmis();
    };
  }, [user.uid]);

  const monthlyIncome = useMemo(
    () =>
      incomes
        .filter((item) => Number(item.month) === month && Number(item.year) === year)
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomes, month, year]
  );

  const selectedBudget = useMemo(
    () => budgetDocs.find((item) => Number(item.month) === month && Number(item.year) === year),
    [budgetDocs, month, year]
  );

  const budgetItems = Array.isArray(selectedBudget?.items) ? selectedBudget.items : [];
  const budgetEstimated = budgetItems.reduce((sum, item) => sum + toNumber(item.estimatedAmount), 0);
  const budgetActual = budgetItems.reduce((sum, item) => sum + toNumber(item.actualAmount), 0);

  const totalPaidDebt = useMemo(() => emis.reduce((sum, item) => sum + toNumber(item.paidAmount), 0), [emis]);
  const totalDebt = useMemo(
    () =>
      emis.reduce(
        (sum, item) => sum + toNumber(item.totalPlanned || toNumber(item.monthlyEmi) * toNumber(item.tenorMonths)),
        0
      ),
    [emis]
  );
  const remainingDebt = Math.max(0, totalDebt - totalPaidDebt);

  const monthlyEarningRows = useMemo(
    () =>
      MONTH_OPTIONS.map((opt) => ({
        label: opt.label,
        value: incomes
          .filter((item) => Number(item.year) === year && Number(item.month) === Number(opt.value))
          .reduce((sum, item) => sum + toNumber(item.amount), 0)
      })),
    [incomes, year]
  );

  const monthlyDebitRows = useMemo(
    () =>
      MONTH_OPTIONS.map((opt) => {
        const targetIndex = monthIndex(year, opt.value);
        const value = emis.reduce((sum, emi) => {
          const monthlyEmi = toNumber(emi.monthlyEmi);
          const tenorMonths = Math.max(0, Math.trunc(toNumber(emi.tenorMonths)));
          const startYear = Math.trunc(toNumber(emi.startYear));
          const startMonth = Math.trunc(toNumber(emi.startMonth));

          if (monthlyEmi <= 0 || tenorMonths <= 0 || startYear <= 0 || startMonth < 1 || startMonth > 12) {
            return sum;
          }

          const startIndex = monthIndex(startYear, startMonth);
          const endIndexExclusive = startIndex + tenorMonths;
          const isActiveInMonth = targetIndex >= startIndex && targetIndex < endIndexExclusive;
          return sum + (isActiveInMonth ? monthlyEmi : 0);
        }, 0);

        return { label: opt.label, value };
      }),
    [emis, year]
  );

  const monthlyBudgetEstimatedRows = useMemo(
    () =>
      MONTH_OPTIONS.map((opt) => {
        const budgetDoc = budgetDocs.find(
          (item) => Number(item.year) === year && Number(item.month) === Number(opt.value)
        );
        const items = Array.isArray(budgetDoc?.items) ? budgetDoc.items : [];
        return {
          label: opt.label,
          value: items.reduce((sum, item) => sum + toNumber(item.estimatedAmount), 0)
        };
      }),
    [budgetDocs, year]
  );

  const categoryRows = useMemo(() => {
    const byCategory = new Map();
    budgetItems.forEach((item) => {
      const key = String(item.category || "Category").trim() || "Category";
      byCategory.set(key, (byCategory.get(key) || 0) + toNumber(item.estimatedAmount));
    });
    return [...byCategory.entries()].map(([label, value]) => ({ label, value }));
  }, [budgetItems]);

  const incomeVsBudgetVsEmi = [
    { label: "Income", value: monthlyIncome },
    { label: "Budget Est.", value: budgetEstimated },
    { label: "EMI Paid", value: totalPaidDebt }
  ];

  const netPosition = monthlyIncome - (budgetActual + totalPaidDebt);

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Track your balance, income, budget, and EMI by month.</p>

      <div className="form-card">
        <div className="form-grid">
          <div className="field">
            <label>Month</label>
            <CustomSelect value={month} onChange={(value) => setMonth(Number(value))} options={MONTH_OPTIONS} />
          </div>
          <div className="field">
            <label>Year</label>
            <CustomSelect
              value={year}
              onChange={(value) => setYear(Number(value))}
              options={yearOptions.map((item) => ({ value: item, label: String(item) }))}
            />
          </div>
        </div>
      </div>

      <div className="cards">
        <article className="card">
          <h2>Account Balance</h2>
          <p>{formatCurrency(accountBalance, currency)}</p>
          <small>Saved in your profile</small>
        </article>
        <article className="card">
          <h2>This Month Income</h2>
          <p>{formatCurrency(monthlyIncome, currency)}</p>
          <small>
            {monthLabel(month)} {year}
          </small>
        </article>
        <article className="card">
          <h2>Budget Estimated</h2>
          <p>{formatCurrency(budgetEstimated, currency)}</p>
          <small>
            {monthLabel(month)} {year}
          </small>
        </article>
      </div>

      <div className="admin-grid">
        <LineChartCard title={`Income Trend (${year})`} rows={monthlyEarningRows} currency={currency} />
        <BarsChartCard
          title={`${monthLabel(month)} ${year}: Income vs Budget vs EMI`}
          rows={incomeVsBudgetVsEmi}
          currency={currency}
        />
      </div>

      <div className="admin-grid">
        <LineChartCard title={`Monthly Debit Trend (${year})`} rows={monthlyDebitRows} currency={currency} />
        <BarsChartCard
          title={`Monthly Budget Estimated (${year})`}
          rows={monthlyBudgetEstimatedRows}
          currency={currency}
        />
      </div>

      <div className="admin-grid">
        <DonutChartCard
          title={`${monthLabel(month)} ${year}: Budget by Category (Estimated)`}
          rows={categoryRows}
          currency={currency}
        />
      </div>

      <div className="table-card">
        <h3>Recent Income Entries</h3>
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
                <th>CreateOn</th>
              </tr>
            </thead>
            <tbody>
              {incomes.slice(0, 8).map((item) => (
                <tr key={item.id}>
                  <td>{monthLabel(item.month)}</td>
                  <td>{item.year}</td>
                  <td>{item.source}</td>
                  <td>{formatCurrency(Number(item.amount), currency)}</td>
                  <td>{formatAsGstDateTime(item.createdAt || item.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
