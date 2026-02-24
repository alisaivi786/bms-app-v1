export const LOOKUP_TYPE_ENUM = {
  INCOME_SOURCE: 1
};

export const LOOKUP_TYPES = [
  {
    id: LOOKUP_TYPE_ENUM.INCOME_SOURCE,
    key: "incomeSourceLookup",
    label: "Income Source Lookup"
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

export function buildDefaultLookupItems() {
  return DEFAULT_INCOME_SOURCE_LOOKUPS.map((name, index) => ({
    id: index + 1,
    typeId: LOOKUP_TYPE_ENUM.INCOME_SOURCE,
    name
  }));
}

export function getLookupTypeById(typeId) {
  return LOOKUP_TYPES.find((item) => item.id === typeId);
}

export function getLookupTypeByKey(key) {
  return LOOKUP_TYPES.find((item) => item.key === key);
}
