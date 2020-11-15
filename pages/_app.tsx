import { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
