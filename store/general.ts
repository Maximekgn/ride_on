import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GeneralState = {
  isFirstOpen: boolean;
  setFirstOpen: (value: boolean) => void;
  markOpened: () => void;
  reset: () => void;
};

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      isFirstOpen: true,
      setFirstOpen: (value) => set({ isFirstOpen: value }),
      markOpened: () => set({ isFirstOpen: false }),
      reset: () => set({ isFirstOpen: true }),
    }),
    {
      name: "general-store",
      version: 1,
      partialize: (state) => ({ isFirstOpen: state.isFirstOpen }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Sélecteurs pratiques
export const useIsFirstOpen = () => useGeneralStore((s) => s.isFirstOpen);
export const useMarkOpened = () => useGeneralStore((s) => s.markOpened);
