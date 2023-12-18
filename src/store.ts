import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import { sideMenuSlice } from './redux/SideMenu/sideMenuSlice';

const rootReducer = combineReducers({
  sideMenu: sideMenuSlice.reducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
