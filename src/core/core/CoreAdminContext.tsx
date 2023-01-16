import { QueryClient } from 'react-query';
import { AdminChildren } from '../types';

import { DataProvider } from '../types';

export interface CoreAdminContextProps {
  basename?: string;
  children?: AdminChildren;
  dataProvider?: DataProvider;
  queryClient?: QueryClient;
}
