import { create } from "zustand";
import { persist, combine, createJSONStorage } from "zustand/middleware";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { getRandomBalance, parseAmount } from "@/lib/currencies";

const PROFILE_STORAGE_KEY = "user-storage";

type Balance = {
  amount: number;
  currency: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  balance: Balance;
};

const getDefaultUser = async (): Promise<User> => {
  const randomBalance = await getRandomBalance(DEFAULT_CURRENCY);

  return {
    id: 1,
    name: "Jimmy Morales",
    email: "kskrises@gmail.com",
    balance: {
      amount: parseAmount(randomBalance),
      currency: DEFAULT_CURRENCY,
    },
  };
};

type DefaultValues = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const getDefaultValues = (): DefaultValues => {
  if (typeof window === "undefined") {
    return {
      user: null,
      status: "loading",
    };
  }

  const userFromStorage = window.localStorage.getItem("PROFILE_STORAGE_KEY");

  if (!userFromStorage) {
    return {
      user: null,
      status: "unauthenticated",
    };
  }

  const user = JSON.parse(userFromStorage) as User;

  return {
    user,
    status: "authenticated",
  };
};

export const useProfileStore = create(
  persist(
    combine(getDefaultValues(), (set, get) => ({
      signIn: async () => {
        const user = await getDefaultUser();

        set({ user, status: "authenticated" });
      },
      signOut: () => set(() => ({ user: null, status: "unauthenticated" })),
      subtractBalance: (charged: number) => {
        const { user, status } = get();

        if (!user || !status) return;

        if (user.balance.amount >= charged) {
          set({
            status: status,
            user: {
              ...user,
              balance: {
                ...user.balance,
                amount: parseAmount(user.balance.amount - charged),
              },
            },
          });
        } else {
          throw new Error("Saldo insuficiente para realizar la compra.");
        }
      },
      addBalance: (add: number) => {
        const { status, user } = get();

        if (!user || !status) return;

        set({
          status: status,
          user: {
            ...user,
            balance: {
              ...user.balance,
              amount: parseAmount(user.balance.amount + add),
            },
          },
        });
      },
    })),
    {
      name: PROFILE_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
