import React, { ReactNode } from 'react';
import Admin from './Admin';
import CompetitionList from './admin/competitions/CompetitionList';
import SeasonList from './admin/seasons/SeasonList';
import { ErrorBoundary } from 'react-error-boundary';

import authProvider from './authProvider';
import { Resource } from './core';
import dataProviderFactory from './dataProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GameRoundList from './admin/rounds/GameRoundList';
import MatchList from './admin/matches/MatchList';
import TeamList from './admin/teams/TeamList';

const API = process.env.REACT_APP_API as string;
const dataProvider = dataProviderFactory(API);
const Layout = ({ children }: any) => (
  <div>
    <ErrorBoundary fallbackRender={({error, resetErrorBoundary}) => (
      <span>{error}</span>
    )}>
      {children}
    </ErrorBoundary>
  </div>
)

const LigiAdmin = () => (
  <Admin
    title="Ligi Predictor Admin"
    dataProvider={dataProvider}
    authProvider={authProvider}
    basename='/admin'
    layout={Layout}
  >
    <Resource
      name="competitions"
      path="competitions"
      pathKey="competitions"
      list={CompetitionList}
    />
    <Resource
      name="seasons"
      path="competitions/:competition/seasons"
      pathKey="competitions.edit.seasons"
      list={SeasonList}
    />
    <Resource
      name="rounds"
      path="competitions/:competition/seasons/:season/teams"
      pathKey="competitions.edit.seasons.edit.teams"
      list={TeamList}
    />
    <Resource
      name="rounds"
      path="competitions/:competition/seasons/:season/gamerounds"
      pathKey="competitions.edit.seasons.edit.rounds"
      list={GameRoundList}
    />
    <Resource
      name="roundMatches"
      path="competitions/:competition/seasons/:season/gamerounds/:round/matches"
      pathKey="competitions.edit.seasons.edit.rounds.edit.matches"
      source={{ name: 'seasonMatches', path: 'competitions/:competition/seasons/:season/matches' }}
      list={MatchList}
    />
  </Admin>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<LigiAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
