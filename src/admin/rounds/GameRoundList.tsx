import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { Link } from 'react-router-dom';
import { useBasename } from '../../core';

const GameRoundList = () => {
  return (
    <ListBase>
      <GameRoundListView />
    </ListBase>
  );
};

const MatchesLink = ({ roundSlug, roundsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${roundsPath}/${roundSlug}/matches`;
  return roundSlug ? (
    <Link
      to={to}
    >
      Matches
    </Link>
  ) : null;
};

const GameRoundListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <MatchesLink roundSlug={record.slug} roundsPath={resource.path} />
        </li>
      ))}
    </ul>
  );
};

export default GameRoundList;