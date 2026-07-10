import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initThemeMode } from 'flowbite-react';
import { setStore } from 'flowbite-react/store';
import App from './App';
import './index.css';

setStore({ version: 3, mode: 'light' });
initThemeMode({ version: 3, defaultMode: 'light' });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
