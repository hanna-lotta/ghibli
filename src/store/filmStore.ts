import { create } from 'zustand';
import type { ApiData } from '../data/types';

interface FilmStore {
  films: ApiData[];
  setFilms: (films: ApiData[]) => void;
}

export const useFilmStore = create<FilmStore>((set) => ({
  films: [],
  setFilms: (films) => set({ films })
}));
