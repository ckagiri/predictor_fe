import React from 'react';
import { ListBase, useListContext } from '../../core/controller';
import { Link } from 'react-router-dom';
import { useBasename } from '../../core';

const CompetitionList = () => {
  return (
    <ListBase>
      <CompetitionListView />
    </ListBase>
  );
};

const SeasonsLink = ({ competitionSlug, competitionsPath }: any) => {
  const basename = useBasename();
  const to = `${basename}/${competitionsPath}/${competitionSlug}/seasons`;
  return competitionSlug ? (
    <Link
      to={to}
    >
      Seasons
    </Link>
  ) : null;
};

const CompetitionListView = () => {
  const { data, isLoading, resource } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}&nbsp;
          <SeasonsLink competitionSlug={record.slug} competitionsPath={resource.path} />
        </li>
      ))}
    </ul>
  );
};

export default CompetitionList;