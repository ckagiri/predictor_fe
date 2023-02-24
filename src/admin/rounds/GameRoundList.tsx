import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { generatePath, Link, useParams } from 'react-router-dom';
import { useBasename } from '../../core';

const GameRoundList = () => {
  return (
    <ListBase>
      <GameRoundListView />
    </ListBase>
  );
};

const MatchesLink = ({ round, roundsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${roundsPath}/${round.slug}/matches`;
  return round ? (
    <Link
      to={to}
    >
      Matches
    </Link>
  ) : null;
};

const GameRoundListView = () => {
  const { data, isLoading, resource } = useListContext();
  const pathParams = useParams();
  const roundsPath = generatePath(resource.path, pathParams);

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <MatchesLink round={record} roundsPath={roundsPath} />
        </li>
      ))}
    </ul>
  );
};

export default GameRoundList;