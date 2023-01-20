import * as React from 'react';
import {
  Children,
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useLogout, usePermissions } from '../auth';
import { useSafeSetState } from '../util';
import {
  AdminChildren,
  RenderResourcesFunction,
  ResourceDefinition,
  ResourceProps,
} from '../types';
import { useResourceDefinitionContext } from './useResourceDefinitionContext';

