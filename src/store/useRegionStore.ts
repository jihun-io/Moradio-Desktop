// stores/useRegionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegionState {
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      selectedRegions: ["capital"],
      setSelectedRegions: (regions) => set({ selectedRegions: regions }),
    }),
    {
      name: "region-storage",
    }
  )
);
