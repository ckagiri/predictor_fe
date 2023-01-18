import { useContext } from 'react';

import { BasenameContext } from './BasenameContext';

/**
 * @see BasenameContextProvider
 *
 * import { useBasename } from 'core-admin';
 *
 * const ArticleLink = ({ title, id }) => {
 *    const basename = useBasename();
 *    return <a href={`${basename}/articles/${id}`}>{title}</a>;
 * };
 */
export const useBasename = () => useContext(BasenameContext);
