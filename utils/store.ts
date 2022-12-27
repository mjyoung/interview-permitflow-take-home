import { LocationMunicipality } from '@prisma/client';
import create from 'zustand';

export interface Store {
  municipalities: LocationMunicipality[];
  setMunicipalities(municipalities: LocationMunicipality[]): void;
  isLoading: boolean;
  setLoading(isLoading: boolean): void;
}

const initialState = {
  municipalities: [],
  isLoading: false,
};

export const useStore = create<Store>(
  // persist(
  (set, _get) => ({
    ...initialState,
    setMunicipalities: (municipalities: LocationMunicipality[]) =>
      set({ municipalities }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
  })
);
