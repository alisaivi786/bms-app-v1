import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";
import { usePreferencesStore } from "../state/preferencesStore";
import { formatCurrency } from "../utils/currency";
import CustomSelect from "../components/CustomSelect";
import CustomSearchForm from "../components/CustomSearchForm";
import GridToolbar from "../components/GridToolbar";
import GridPageSizeSelect from "../components/GridPageSizeSelect";
import { OneYearDatePickerComponent } from "../components/OneYearDateRangePicker";
import { formatAsGstDateTime } from "../utils/dateTime";

const ALL_VALUE = "__ALL__";

function resolveIncomeDate(row) {
  const createdAt = row?.createdAt;
  if (createdAt && typeof createdAt.toDate === "function") {
    const date = createdAt.toDate();
    if (date instanceof Date && !Number.isNaN(date.getTime())) return date;
  }
  const year = Number(row?.year || 0);
  const month = Number(row?.month || 1);
  if (Number.isInteger(year) && year > 0 && Number.isInteger(month) && month >= 1 && month <= 12) {
    return new Date(year, month - 1, 1);
  }
  return null;
}

function formatDisplayDate(date, fallbackYear, fallbackMonth) {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return `${String(fallbackYear || "").padStart(4, "0")}-${String(fallbackMonth || "").padStart(2, "0")}-01`;
}

export default function IncomeReportPage() {
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];
  const { user } = useAuth();
  const currency = usePreferencesStore((state) => state.currency);
  const incomes = useFinanceStore((state) => state.userDataByUid[user.uid]?.incomes || []);
  const [lookupItems, setLookupItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const defaultSearchValues = useMemo(
    () => ({
      operationDateRange: {
        fromDate: "",
        toDate: ""
      },
      source: ALL_VALUE
    }),
    []
  );
  const [searchValues, setSearchValues] = useState(defaultSearchValues);
  const [appliedSearchValues, setAppliedSearchValues] = useState(defaultSearchValues);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      const lookups = Array.isArray(data.lookupItems) ? data.lookupItems : [];
      setLookupItems(lookups);
    });
    return unsub;
  }, [user.uid]);

  const sourceOptions = useMemo(() => {
    const set = new Set();
    lookupItems.forEach((item) => {
      if (Number(item?.typeId) !== 1) return;
      const value = String(item?.name || "").trim();
      if (value) set.add(value);
    });
    incomes.forEach((item) => {
      const value = String(item?.source || "").trim();
      if (value) set.add(value);
    });
    return [ALL_VALUE, ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [incomes, lookupItems]);

  const filteredRows = useMemo(() => {
    const fromTime = appliedSearchValues.operationDateRange?.fromDate
      ? new Date(`${appliedSearchValues.operationDateRange.fromDate}T00:00:00`).getTime()
      : null;
    const toTime = appliedSearchValues.operationDateRange?.toDate
      ? new Date(`${appliedSearchValues.operationDateRange.toDate}T23:59:59`).getTime()
      : null;

    return incomes.filter((row) => {
      const rowDate = resolveIncomeDate(row);
      const rowTime = rowDate ? rowDate.getTime() : null;
      if (rowTime == null) return false;
      const rangeOk =
        (fromTime == null || rowTime >= fromTime) &&
        (toTime == null || rowTime <= toTime);
      const sourceOk =
        appliedSearchValues.source === ALL_VALUE ||
        String(row.source || "").trim().toLowerCase() ===
          String(appliedSearchValues.source || "").trim().toLowerCase();
      return rangeOk && sourceOk;
    });
  }, [appliedSearchValues, incomes]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pagedRows = filteredRows.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [appliedSearchValues, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const onSearch = (event) => {
    event.preventDefault();
    setAppliedSearchValues({
      operationDateRange: {
        fromDate: String(searchValues.operationDateRange?.fromDate || ""),
        toDate: String(searchValues.operationDateRange?.toDate || "")
      },
      source: String(searchValues.source || ALL_VALUE)
    });
  };

  const onReset = () => {
    setSearchValues(defaultSearchValues);
    setAppliedSearchValues(defaultSearchValues);
  };

  const formBox = useMemo(
    () => ({
      values: searchValues,
      setFieldValue: (field, value) => setSearchValues((prev) => ({ ...prev, [field]: value }))
    }),
    [searchValues]
  );

  return (
    <section>
      <h1>Income Report</h1>
      <p className="muted">View income records by selected date range and source.</p>

      <CustomSearchForm values={searchValues} defaultValues={defaultSearchValues} onSubmit={onSearch} onReset={onReset}>
        <div className="form-grid">
          {OneYearDatePickerComponent({
            form: formBox,
            field: "operationDateRange",
            label: "Application Creation Date",
            hasTimePicker: true,
            isRequired: false,
            customSelectionRangeDays: 365
          })}
          <div className="field">
            <label>Source</label>
            <CustomSelect
              value={searchValues.source}
              onChange={(value) => setSearchValues((prev) => ({ ...prev, source: String(value) }))}
              options={sourceOptions.map((value) => ({
                value,
                label: value === ALL_VALUE ? "All Sources" : value
              }))}
            />
          </div>
        </div>
      </CustomSearchForm>

      <div className="table-card">
        <GridToolbar
          left={
            <GridPageSizeSelect
              id="income-report-page-size"
              value={pageSize}
              onChange={setPageSize}
              options={PAGE_SIZE_OPTIONS}
            />
          }
        />

        {filteredRows.length === 0 ? (
          <p className="muted">No income records found for selected filters.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Amount</th>
                <th>CreateOn</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((item) => (
                <tr key={item.id}>
                  <td>{formatDisplayDate(resolveIncomeDate(item), item.year, item.month)}</td>
                  <td>{item.source}</td>
                  <td>{formatCurrency(Number(item.amount || 0), currency)}</td>
                  <td>{formatAsGstDateTime(item.createdAt || item.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filteredRows.length > 0 ? (
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
    </section>
  );
}
