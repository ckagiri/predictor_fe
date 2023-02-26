import React from 'react';
import { ListBase, useListContext } from '../../core/controller';

const TeamList = () => {
  return (
    <ListBase>
      <TeamListView />
    </ListBase>
  );
};

const TeamListView = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={ id}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default TeamList;