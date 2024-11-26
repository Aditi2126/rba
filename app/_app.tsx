// import '../styles/globals.css';
// import '../styles/print.css';

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;


import { AppProps } from 'next/app';
import '../styles/print.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
