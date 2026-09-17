import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '@/types/movie';

interface MovieStore {
  favorites: Movie[];
  watchlist: Movie[];

  // Favorites
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;

  // Watchlist
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],

      // Favorites
      addToFavorites: (movie) =>
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) return state;
          return { favorites: [...state.favorites, movie] };
        }),

      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      toggleFavorite: (movie) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        if (isFavorite(movie.id)) {
          removeFromFavorites(movie.id);
        } else {
          addToFavorites(movie);
        }
      },

      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),

      // Watchlist
      addToWatchlist: (movie) =>
        set((state) => {
          if (state.watchlist.some((m) => m.id === movie.id)) return state;
          return { watchlist: [...state.watchlist, movie] };
        }),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),

      toggleWatchlist: (movie) => {
        const { isInWatchlist, addToWatchlist, removeFromWatchlist } = get();
        if (isInWatchlist(movie.id)) {
          removeFromWatchlist(movie.id);
        } else {
          addToWatchlist(movie);
        }
      },

      isInWatchlist: (movieId) => get().watchlist.some((m) => m.id === movieId),
    }),
    {
      name: 'movie-store',
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    }
  )
);
