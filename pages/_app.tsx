import React from 'react';
import { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.css';

const currentDate = new Date();

export const DateContext = React.createContext(currentDate);

function App({ Component, pageProps }: AppProps) {
  return (
    <DateContext.Provider value={currentDate}>
      <Component {...pageProps} />
    </DateContext.Provider>
  );
}

export default App;
