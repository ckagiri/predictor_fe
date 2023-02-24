import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { generatePath, Link, useParams } from 'react-router-dom';
import { useBasename } from '../../core';

const SeasonList = () => {
  return (
    <ListBase>
      <SeasonListView />
    </ListBase>
  );
};

const RoundsLink = ({ season, seasonsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${seasonsPath}/${season.slug}/gamerounds`;
  return season ? (
    <Link
      to={to}
    >
      Rounds
    </Link>
  ) : null;
};

const SeasonListView = () => {
  const { data, isLoading, resource } = useListContext();
  const pathParams = useParams();
  const seasonsPath = generatePath(resource.path, pathParams);

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <RoundsLink season={record} seasonsPath={seasonsPath} />
        </li>
      ))}
    </ul>
  );
};

export default SeasonList;