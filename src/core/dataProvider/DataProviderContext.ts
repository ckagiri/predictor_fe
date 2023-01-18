import { createContext } from 'react';

import { DataProvider } from '../types';

const DataProviderContext = createContext<DataProvider>(null as any);

DataProviderContext.displayName = 'DataProviderContext';

export default DataProviderContext;
