import { configureQueryClient } from '@graasp/apps-query-client';

import { MOCK_API, API_HOST, GRAASP_APP_KEY } from './env';
import notifier from './notifier';

if (!GRAASP_APP_KEY) {
  throw new Error('GRAASP_APP_KEY should be defined');
}

const {
  queryClient,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  API_ROUTES,
  QUERY_KEYS,
  mutations,
  useQuery,
} = configureQueryClient({
  API_HOST,
  GRAASP_APP_KEY,
  notifier,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  isStandalone: MOCK_API,
  enableWebsocket: false,
});

export {
  useQuery,
  queryClient,
  mutations,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  API_ROUTES,
  QUERY_KEYS,
};
