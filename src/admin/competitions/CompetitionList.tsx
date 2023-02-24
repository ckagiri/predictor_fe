import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { generatePath, Link, useParams } from 'react-router-dom';
import { useBasename } from '../../core';

const CompetitionList = () => {
  return (
    <ListBase>
      <CompetitionListView />
    </ListBase>
  );
};

const SeasonsLink = ({ competition, competitionsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${competitionsPath}/${competition.slug}/seasons`;
  return competition ? (
    <Link
      to={to}
    >
      Seasons
    </Link>
  ) : null;
};

const CompetitionListView = () => {
  const { data, isLoading, resource } = useListContext();
  const pathParams = useParams();
  const competitionsPath = generatePath(resource.path, pathParams);

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <SeasonsLink competition={record} competitionsPath={competitionsPath} />
        </li>
      ))}
    </ul>
  );
};

export default CompetitionList;