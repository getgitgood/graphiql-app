import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import projectReducer from './features/projectSlice';
import { api } from './features/apiSlice';

const rootReducer = combineReducers({
  project: projectReducer,
  [api.reducerPath]: api.reducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
