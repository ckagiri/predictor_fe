import React from 'react';
import { ListBase, useListContext } from '../../core/controller';

const MatchList = () => {
  return (
    <ListBase>
      <MatchListView />
    </ListBase>
  );
};

const MatchListView = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(({ id, homeTeam, awayTeam }) => (
        <li key={ id}>
          {homeTeam.name} vs {awayTeam.name}
        </li>
      ))}
    </ul>
  );
};

export default MatchList;