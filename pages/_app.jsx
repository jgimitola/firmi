import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DataWrapper from '@/modules/components/DataWrapper';
import { CacheProvider, Global, css } from '@emotion/react';
import { SnackbarProvider } from 'notistack';

import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Global
        styles={css`
          body {
            background-color: #f0f0f0 !important;
          }
        `}
      />

      <Head>
        <title>Firmi App</title>
        <meta name="description" content="Satisfaction form webapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <DataWrapper>
              <Component {...pageProps} />
            </DataWrapper>
          </SnackbarProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>
  );
}
