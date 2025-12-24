import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  hideZeroBalance: boolean;
  setHideZeroBalance: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hideZeroBalance: false,
      setHideZeroBalance: (value) => set({ hideZeroBalance: value }),
    }),
    {
      name: 'portal-settings',
    }
  )
);

