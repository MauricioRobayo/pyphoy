import { createContext } from 'react';

const defaultDate = new Date();

const DateContext = createContext(defaultDate);

export default DateContext;
