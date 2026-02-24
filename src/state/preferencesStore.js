import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const CURRENCY_OPTIONS = [
  { code: "USD", label: "US Dollar (USD)" },
  { code: "EUR", label: "Euro (EUR)" },
  { code: "GBP", label: "British Pound (GBP)" },
  { code: "AED", label: "UAE Dirham (AED)" },
  { code: "SAR", label: "Saudi Riyal (SAR)" },
  { code: "PKR", label: "Pakistani Rupee (PKR)" },
  { code: "INR", label: "Indian Rupee (INR)" },
  { code: "JPY", label: "Japanese Yen (JPY)" }
];

export const usePreferencesStore = create(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency })
    }),
    {
      name: "bms-preferences",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
