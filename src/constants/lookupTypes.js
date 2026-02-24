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

export function getLookupTypeById(typeId) {
  return LOOKUP_TYPES.find((item) => item.id === typeId);
}

export function getLookupTypeByKey(key) {
  return LOOKUP_TYPES.find((item) => item.key === key);
}
