/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Head from 'next/head';

import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/tailwind.css';

import { GlobalConfigsProvider } from '@/contexts/GlobalConfigs';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>2 ANOS - GUITOLIVE</title>
      </Head>
      <GlobalConfigsProvider>
        <Component {...pageProps} />
      </GlobalConfigsProvider>
    </>
  );
}
