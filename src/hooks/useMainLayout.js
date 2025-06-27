import { useContext } from 'react';
import { MainLayoutContext } from '../layouts/MainLayout';

export const useMainLayout = () => useContext(MainLayoutContext);
