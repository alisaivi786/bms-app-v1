import { useMemo } from "react";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

export default function DashboardPage() {
  const { user } = useAuth();
  const userData = useFinanceStore((state) => state.userDataByUid[user.uid]);
  const initialBalance = Number(userData?.initialBalance || 0);
  const incomes = userData?.incomes || [];

  const totalIncome = useMemo(
    () => incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomes]
  );
  const monthlyIncome = useMemo(
    () =>
      incomes
        .filter(
          (item) => Number(item.month) === currentMonth && Number(item.year) === currentYear
        )
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomes]
  );
  const accountBalance = initialBalance + totalIncome;

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Track your balance and income for {currentMonth}/{currentYear}.</p>
      <div className="cards">
        <article className="card">
          <h2>Account Balance</h2>
          <p>${accountBalance.toLocaleString()}</p>
          <small>Initial balance + all incomes</small>
        </article>
        <article className="card">
          <h2>This Month Income</h2>
          <p>${monthlyIncome.toLocaleString()}</p>
          <small>Entries in current month</small>
        </article>
        <article className="card">
          <h2>Initial Balance</h2>
          <p>${initialBalance.toLocaleString()}</p>
          <small>Set once, can be updated later</small>
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
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>{item.source}</td>
                  <td>${Number(item.amount).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
