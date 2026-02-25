import { useMemo } from "react";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";
import { usePreferencesStore } from "../state/preferencesStore";
import { formatCurrency } from "../utils/currency";
import { monthLabel } from "../constants/months";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

export default function DashboardPage() {
  const { user } = useAuth();
  const userData = useFinanceStore((state) => state.userDataByUid[user.uid]);
  const currency = usePreferencesStore((state) => state.currency);
  const accountBalance = Number(userData?.accountBalance || 0);
  const incomes = userData?.incomes || [];

  const monthlyIncome = useMemo(
    () =>
      incomes
        .filter(
          (item) => Number(item.month) === currentMonth && Number(item.year) === currentYear
        )
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomes]
  );
  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Track your balance and income for {monthLabel(currentMonth)} {currentYear}.</p>
      <div className="cards">
        <article className="card">
          <h2>Account Balance</h2>
          <p>{formatCurrency(accountBalance, currency)}</p>
          <small>Saved in your profile</small>
        </article>
        <article className="card">
          <h2>This Month Income</h2>
          <p>{formatCurrency(monthlyIncome, currency)}</p>
          <small>Entries in current month</small>
        </article>
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
              </tr>
            </thead>
            <tbody>
              {incomes.slice(0, 8).map((item) => (
                <tr key={item.id}>
                  <td>{monthLabel(item.month)}</td>
                  <td>{item.year}</td>
                  <td>{item.source}</td>
                  <td>{formatCurrency(Number(item.amount), currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
