import { describe, it, expect, beforeEach } from 'vitest';
import { useMovieStore } from './movieStore';
import type { Movie } from '@/types/movie';

const movie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'A movie used for testing.',
  poster_path: null,
  backdrop_path: null,
  release_date: '2024-01-01',
  vote_average: 8,
  vote_count: 100,
  genre_ids: [],
  adult: false,
};

beforeEach(() => {
  useMovieStore.setState({ favorites: [] });
});

describe('useMovieStore favorites', () => {
  it('adds a movie to favorites', () => {
    useMovieStore.getState().addToFavorites(movie);
    expect(useMovieStore.getState().isFavorite(movie.id)).toBe(true);
  });

  it('does not add the same movie twice', () => {
    useMovieStore.getState().addToFavorites(movie);
    useMovieStore.getState().addToFavorites(movie);
    expect(useMovieStore.getState().favorites).toHaveLength(1);
  });

  it('removes a movie from favorites', () => {
    useMovieStore.getState().addToFavorites(movie);
    useMovieStore.getState().removeFromFavorites(movie.id);
    expect(useMovieStore.getState().isFavorite(movie.id)).toBe(false);
  });

  it('toggles favorite status', () => {
    useMovieStore.getState().toggleFavorite(movie);
    expect(useMovieStore.getState().isFavorite(movie.id)).toBe(true);

    useMovieStore.getState().toggleFavorite(movie);
    expect(useMovieStore.getState().isFavorite(movie.id)).toBe(false);
  });
});
