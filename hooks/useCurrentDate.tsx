import { useContext } from 'react';
import { DateContext } from '../pages/_app';

const useCurrentDate = () => useContext(DateContext);

export default useCurrentDate;
