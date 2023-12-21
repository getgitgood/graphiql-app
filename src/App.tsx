import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Context/Context';
import { setupStore } from './store';

import WelcomePage from './layouts/WelcomePage/WelcomePage';
import Main from './layouts/Main/Main';
import Graphiql from './pages/Graphiql/Graphiql';
import { Provider } from 'react-redux';
import Auth from './pages/Auth/Auth';

const store = setupStore();

import PrivateRoute from './utils/PrivateRoute';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import GraphiQl from './pages/graphql/Test';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Main />} path="/">
      <Route index element={<WelcomePage />} path="/" />
      <Route element={<Graphiql />} path="/welcome" />
      <Route
        element={
          <PrivateRoute>
            <Auth />
          </PrivateRoute>
        }
        path="/auth"
      />
      <Route path="/graphiql" element={<GraphiQl />} />
    </Route>
  )
);

const store = setupStore();

export default function App() {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppContextProvider>
  );
}
