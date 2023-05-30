import {
  buildMockLocalContext,
  buildMockParentWindow,
  configureQueryClient,
} from '@graasp/apps-query-client';

import { MOCK_CONTEXT } from '../data/db';
import { REACT_APP_GRAASP_APP_KEY } from './env';
import notifier from './notifier';
import { ENABLE_MOCK_API } from './settings';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  API_ROUTES,
  QUERY_KEYS,
  useQuery,
  mutations,
} = configureQueryClient({
  notifier,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  GRAASP_APP_KEY: REACT_APP_GRAASP_APP_KEY,
  targetWindow: ENABLE_MOCK_API // build mock parent window given cypress context or mock data
    ? buildMockParentWindow(
        buildMockLocalContext({ ...MOCK_CONTEXT, ...window.appContext })
      )
    : window.parent,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  API_ROUTES,
  QUERY_KEYS,
  useQuery,
  mutations,
};
