import { useEffect } from 'react';
import { useMovieDetails } from '@/hooks/useMovies';
import type { Movie } from '@/types/movie';
import { TrailerModal } from './TrailerModal';

interface TrailerModalFromStoreProps {
  movie: Movie;
  onClose: () => void;
  onNoTrailer?: () => void;
}

export function TrailerModalFromStore({ movie, onClose, onNoTrailer }: TrailerModalFromStoreProps) {
  const { data, isLoading } = useMovieDetails(movie.id);
  const videos = data?.videos?.results ?? [];
  const hasTrailer = videos.some((v) => v.site === 'YouTube');

  // Only known once the detail fetch resolves — don't show an empty window meanwhile.
  useEffect(() => {
    if (!isLoading && !hasTrailer) {
      onNoTrailer?.();
      onClose();
    }
  }, [isLoading, hasTrailer, onNoTrailer, onClose]);

  if (isLoading || !hasTrailer) return null;

  return <TrailerModal videos={videos} visible={true} onClose={onClose} movieTitle={movie.title} />;
}
