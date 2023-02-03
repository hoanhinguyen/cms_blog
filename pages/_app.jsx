import React, {useEffect, useState} from 'react';
import { Layout } from '../components';

import 'tailwindcss/tailwind.css';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
       {/* the component will have a header above it */}
        <Component {...pageProps} />
    </Layout>

    )
}

export default MyApp
