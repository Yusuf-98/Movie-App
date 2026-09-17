import { MovieGrid } from './MovieGrid';
import type { Movie } from '@/types/movie';

export function SimilarMoviesSection({ movies }: { movies: Movie[] }) {
  if (!movies.length) return null;

  return (
    <div className="pb-40">
      <MovieGrid movies={movies} isLoading={false} title="Similar Movies" />
    </div>
  );
}
