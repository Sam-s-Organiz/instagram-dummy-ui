import { AppProps } from 'next/app';
import './globals.css'; // Adjust the path as per your setup

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
