import React from 'react';
import Admin from './Admin';
import CompetitionList from './admin/competitions/CompetitionList';
import SeasonList from './admin/seasons/SeasonList';

import authProvider from './authProvider';
import { Resource } from './core';
import dataProviderFactory from './dataProvider';

const API = process.env.REACT_APP_API as string;
const dataProvider = dataProviderFactory(API);
const Layout = ({children}: any) => <div>{children}</div>

function App() {
  return (
    <Admin
      title="Ligi Predictor Admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
    >
      <Resource
        name="competitions"
        path="competitions"
        pathKey="competitions"
        list={CompetitionList}
      />
      {/* <Resource
        name="seasons"
        path="competitions/:competition/:seasons"
        pathKey="competitions.edit.seasons"
        list={SeasonList}
      /> */}
    </Admin>
  );
}

export default App;
