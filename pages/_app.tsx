import { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
