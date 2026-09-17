import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrailerModal } from './TrailerModal';
import type { Video } from '@/types/movie';

const trailer: Video = {
  id: 'v1',
  key: 'abc123',
  name: 'Official Trailer',
  site: 'YouTube',
  type: 'Trailer',
  official: true,
  published_at: '2024-01-01',
};

describe('TrailerModal', () => {
  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <TrailerModal videos={[trailer]} visible={true} onClose={onClose} movieTitle="Test Movie" />
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <TrailerModal videos={[trailer]} visible={true} onClose={onClose} movieTitle="Test Movie" />
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when not visible', () => {
    const onClose = vi.fn();
    render(
      <TrailerModal videos={[trailer]} visible={false} onClose={onClose} movieTitle="Test Movie" />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
