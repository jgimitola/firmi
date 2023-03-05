import * as React from 'react';

import Head from 'next/head';

import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';
import { CacheProvider, Global, css } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

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

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
