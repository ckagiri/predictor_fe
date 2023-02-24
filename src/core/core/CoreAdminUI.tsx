import * as React from 'react';
import { ComponentType, useEffect, isValidElement, createElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import { CoreAdminRoutes } from './CoreAdminRoutes';
import { Ready } from '../util';
import {
  TitleComponent,
  LoginComponent,
  LayoutComponent,
  CoreLayoutProps,
  AdminChildren,
  CatchAllComponent,
  LoadingComponent,
} from '../types';

export type ChildrenFunction = () => ComponentType[];

const DefaultLayout = ({ children }: CoreLayoutProps) => <>{children}</>;

export interface CoreAdminUIProps {
  catchAll?: CatchAllComponent;
  children?: AdminChildren;
  layout?: LayoutComponent;
  loading?: LoadingComponent;
  loginPage?: LoginComponent | boolean;
  requireAuth?: boolean;
  ready?: ComponentType;
  title?: TitleComponent;
}

export const CoreAdminUI = (props: CoreAdminUIProps) => {
  const {
    catchAll = () => (<div>Not Found</div>),
    children,
    layout = DefaultLayout,
    loading = Noop,
    loginPage: LoginPage = false,
    ready = Ready,
    requireAuth = false,
  } = props;

  return (
    <Routes>
      {LoginPage !== false && LoginPage !== true ? (
        <Route path="/login" element={createOrGetElement(LoginPage)} />
      ) : null}
      <Route
        path="/*"
        element={
          <CoreAdminRoutes
            catchAll={catchAll}
            layout={layout}
            loading={loading}
            requireAuth={requireAuth}
            ready={ready}
          >
            {children}
          </CoreAdminRoutes>
        }
      />
    </Routes>
  );
};

const createOrGetElement = (el: any) => (isValidElement(el) ? el : createElement(el));

const Noop = () => null;
