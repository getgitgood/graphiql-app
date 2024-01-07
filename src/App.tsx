import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import AppContextProvider from './components/Context/Context';
import EditorContextProvider from './components/EditorContext/EditorContext';
import { tokenCheckInterval } from './utils/checkTokenExp ';

import WelcomePage from './layouts/WelcomePage/WelcomePage';
import Main from './layouts/Main/Main';
import Graphiql from './pages/Graphiql/Graphiql';
import Auth from './pages/Auth/Auth';

const store = setupStore();

import PrivateRoute from './utils/PrivateRoute';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import Page404 from './pages/Page404/Page404';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Main />} path="/" errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />} path="/" />
      <Route
        element={
          <PrivateRoute redirectTo="/graphiql">
            <Auth />
          </PrivateRoute>
        }
        path="/auth"
      />
      <Route
        element={
          <PrivateRoute redirectTo="/" isReversedDirection={true}>
            <EditorContextProvider>
              <Graphiql />
            </EditorContextProvider>
          </PrivateRoute>
        }
        path="/graphiql"
      />
      <Route element={<Page404 />} path="*" />
    </Route>
  )
);

tokenCheckInterval;

export default function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppContextProvider>
  );
}
