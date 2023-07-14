/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Head from 'next/head';

import GlobalStyles from '@/styles/GlobalStyles';
import '@/styles/tailwind.css';
import '@/styles/styles.css';
import '@/styles/termo.css';

import { GlobalConfigsProvider } from '@/contexts/GlobalConfigs';
import { AlertProvider } from '@/context/AlertContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>3 ANOS - GUITOLIVE</title>
      </Head>
      <GlobalConfigsProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </GlobalConfigsProvider>
    </>
  );
}
