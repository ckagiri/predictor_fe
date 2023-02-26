import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { Link } from 'react-router-dom';
import { useBasename } from '../../core';

const SeasonList = () => {
  return (
    <ListBase>
      <SeasonListView />
    </ListBase>
  );
};

const RoundsLink = ({ seasonSlug, seasonsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${seasonsPath}/${seasonSlug}/gamerounds`;
  return seasonSlug ? (
    <Link
      to={to}
    >
      Rounds
    </Link>
  ) : null;
};

const TeamsLink = ({ seasonSlug, seasonsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${seasonsPath}/${seasonSlug}/teams`;
  return seasonSlug ? (
    <Link
      to={to}
    >
      Teams
    </Link>
  ) : null;
};

const SeasonListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <RoundsLink seasonSlug={record.slug} seasonsPath={resource.path} />
          &nbsp;
          <TeamsLink seasonSlug={record.slug} seasonsPath={resource.path} />
        </li>
      ))}
    </ul>
  );
};

export default SeasonList;