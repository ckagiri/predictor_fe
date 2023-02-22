import React, { ReactNode } from 'react';
import Admin from './Admin';
import CompetitionList from './admin/competitions/CompetitionList';
import SeasonList from './admin/seasons/SeasonList';
import { ErrorBoundary } from 'react-error-boundary';

import authProvider from './authProvider';
import { Resource } from './core';
import dataProviderFactory from './dataProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
    {/* <Resource
    name="seasons"
    path="competitions/:competition/:seasons"
    pathKey="competitions.edit.seasons"
    list={SeasonList}
  /> */}
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
