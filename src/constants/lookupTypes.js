export const LOOKUP_TYPE_ENUM = {
  INCOME_SOURCE: 1,
  BUDGET_CATEGORY: 2
};

export const LOOKUP_TYPES = [
  {
    id: LOOKUP_TYPE_ENUM.INCOME_SOURCE,
    key: "incomeSourceLookup",
    label: "Income Source Lookup"
  },
  {
    id: LOOKUP_TYPE_ENUM.BUDGET_CATEGORY,
    key: "budgetCategoryLookup",
    label: "Budget Category Lookup"
  }
];

export const DEFAULT_INCOME_SOURCE_LOOKUPS = [
  "Salary",
  "Freelance",
  "Bonus",
  "Commission",
  "Rental Income",
  "Investment Return"
];

export const DEFAULT_BUDGET_CATEGORY_LOOKUPS = [
  "Home",
  "Utility",
  "Loan",
  "Credit Cards",
  "Other"
];

export function buildDefaultLookupItems() {
  const incomeItems = DEFAULT_INCOME_SOURCE_LOOKUPS.map((name, index) => ({
    id: index + 1,
    typeId: LOOKUP_TYPE_ENUM.INCOME_SOURCE,
    name
  }));
  const startId = incomeItems.length;
  const budgetItems = DEFAULT_BUDGET_CATEGORY_LOOKUPS.map((name, index) => ({
    id: startId + index + 1,
    typeId: LOOKUP_TYPE_ENUM.BUDGET_CATEGORY,
    name
  }));
  return [...incomeItems, ...budgetItems];
}

export function getLookupTypeById(typeId) {
  return LOOKUP_TYPES.find((item) => item.id === typeId);
}

export function getLookupTypeByKey(key) {
  return LOOKUP_TYPES.find((item) => item.key === key);
}
