import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/pixelify-sans/700.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { createQueryClient } from '@/queryClient';
import { createAppRouter } from '@/routes';
import { theme } from '@/theme';

const queryClient = createQueryClient();
const router = createAppRouter();

// noSsr: this app only renders in the browser, so apply the theme on the first render.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} noSsr>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* Only rendered in development; tree-shaken from production builds. */}
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  </StrictMode>,
);
