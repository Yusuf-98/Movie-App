import { useMovieDetails } from '@/hooks/useMovies';
import type { Movie } from '@/types/movie';
import { TrailerModal } from './TrailerModal';

export function TrailerModalFromStore({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const { data } = useMovieDetails(movie.id);
  const videos = data?.videos?.results ?? [];

  return <TrailerModal videos={videos} visible={true} onClose={onClose} movieTitle={movie.title} />;
}
