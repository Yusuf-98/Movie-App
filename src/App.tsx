import './index.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { NotFoundState } from '@/components/movie/NotFoundState';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Route-level code splitting — each page ships as its own chunk.
const HomePage = lazy(() => import('@/pages/Homepage').then((m) => ({ default: m.HomePage })));
const MovieDetailPage = lazy(() =>
  import('@/pages/DetailPage').then((m) => ({ default: m.MovieDetailPage }))
);
const FavoritesPage = lazy(() =>
  import('@/pages/FavoritePage').then((m) => ({ default: m.FavoritesPage }))
);
const SearchPage = lazy(() =>
  import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage }))
);

function RouteFallback() {
  return (
    <div className="flex justify-center py-9xl">
      <div className="w-8 h-8 border-2 border-neutral-25 border-t-neutral-800 rounded-full animate-spin" />
    </div>
  );
}

// Dev-only: import.meta.env.DEV is statically replaced at build time, so
// Rollup drops this whole branch (and the devtools chunk) from production.
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((d) => ({ default: d.ReactQueryDevtools }))
    )
  : () => null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundState />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-950 text-white">
          <Navbar />
          <main>
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
