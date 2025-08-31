import { create } from 'zustand';
import type { ApiData } from '../data/types';

interface FavoriteStore {
  favorites: ApiData[];
  addFavorite: (film: ApiData) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  addFavorite: (film) => set((state) => ({
    favorites: state.favorites.some(f => f.id === film.id)
      ? state.favorites
      : [...state.favorites, film]
  })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter(f => f.id !== id)
  }))
}));
