import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Context/Context';

import WelcomePage from './layouts/WelcomePage/WelcomePage';
import Main from './layouts/Main/Main';
import Auth from './pages/Auth/Auth';
import PrivateRoute from './utils/PrivateRoute';
// import Test from './pages/graphql/Test';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import Editor from './components/Editor/Editor';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Main />} path="/">
      <Route index element={<WelcomePage />} path="/" />
      <Route
        element={
          <PrivateRoute>
            <Auth />
          </PrivateRoute>
        }
        path="/auth"
      />
      <Route path="/graphiql" element={<Editor />} />
    </Route>
  )
);

const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </Provider>
  );
}
