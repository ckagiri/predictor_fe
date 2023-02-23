import React from 'react';
import { ListBase, useListContext } from '../../core/controller';

const CompetitionList = () => {
  return (
    // <ListBase>
    //   <CompetitionListView />
    // </ListBase>
    <div>Yay </div>
  );
};

const CompetitionListView = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return <React.Fragment>Loading...</React.Fragment>;
  }

  return (
    <ul>
      {data.map(record => (
        <li key={record.id}>
          {record.name}
        </li>
      ))}
    </ul>
  );
};

export default CompetitionList;