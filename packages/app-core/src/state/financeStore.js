import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const emptyUserData = {
  accountBalance: 0,
  incomes: []
};

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      userDataByUid: {},
      setAccountBalanceForUser: (uid, accountBalance) =>
        set((state) => ({
          userDataByUid: {
            ...state.userDataByUid,
            [uid]: {
              ...(state.userDataByUid[uid] || emptyUserData),
              accountBalance: Number(accountBalance || 0)
            }
          }
        })),
      setIncomesForUser: (uid, incomes) =>
        set((state) => ({
          userDataByUid: {
            ...state.userDataByUid,
            [uid]: {
              ...(state.userDataByUid[uid] || emptyUserData),
              incomes
            }
          }
        })),
      clearUserData: (uid) =>
        set((state) => {
          const next = { ...state.userDataByUid };
          delete next[uid];
          return { userDataByUid: next };
        }),
      getUserData: (uid) => get().userDataByUid[uid] || emptyUserData
    }),
    {
      name: "bms-finance-cache",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userDataByUid: state.userDataByUid })
    }
  )
);
