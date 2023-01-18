import * as React from 'react';
import { BasenameContext } from './BasenameContext';

/**
 * @see useBasename
 */
export const BasenameContextProvider = ({ children, basename }: { children: React.ReactNode, basename: string }) => (
    <BasenameContext.Provider value={basename}>
        {children}
    </BasenameContext.Provider>
);
