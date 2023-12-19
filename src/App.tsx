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
import Auth from './pages/auth/Auth';
import GraphqlEditor from './pages/graphql/Graphql';
import { Provider } from 'react-redux';

const store = setupStore();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Main />} path="/">
      <Route index element={<WelcomePage />} path="/" />
      <Route element={<Auth />} path="/authentication" />
      <Route element={<GraphqlEditor />} path="/welcome" />
      <Route element={<GraphqlEditor />} path="/welcome" />
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
