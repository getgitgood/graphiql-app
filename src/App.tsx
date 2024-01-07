import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import AppContextProvider from './components/Context/Context';
import EditorContextProvider from './components/EditorContext/EditorContext';

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
import Documentation from './layouts/Documentation/Documentation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Documentation />} path="test" />
      <Route element={<Main />} path="/" errorElement={<ErrorPage />}>
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
              <EditorContextProvider>
                <Graphiql />
              </EditorContextProvider>
            </PrivateRoute>
          }
          path="/graphiql"
        />
        <Route element={<Page404 />} path="*" />
      </Route>
    </>
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
