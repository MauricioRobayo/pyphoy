import { createContext } from 'react';

const defaultDate = new Date();

const dateContext = createContext(defaultDate);

export default dateContext;
