import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Context/Context';

import WelcomePage from './layouts/WelcomePage/WelcomePage';
import Main from './layouts/Main/Main';
import Graphiql from './pages/Graphiql/Graphiql';
import Auth from './pages/auth/Auth';

const store = setupStore();

import PrivateRoute from './utils/PrivateRoute';
import { setupStore } from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Main />} path="/">
      <Route index element={<WelcomePage />} path="/" />
      <Route
        element={
          <PrivateRoute redirectTo="/">
            <Auth />
          </PrivateRoute>
        }
        path="/auth"
      />
      <Route
        element={
          <PrivateRoute redirectTo="/" isReversedDirection={true}>
            <Graphiql />
          </PrivateRoute>
        }
        path="/graphiql"
      />
    </Route>
  )
);

export default function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppContextProvider>
  );
}
