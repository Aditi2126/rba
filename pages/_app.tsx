// pages/_app.tsx

import type { AppProps } from 'next/app';
import '../app/styles/globals.css';
// import '../styles/globals.css'; 
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
