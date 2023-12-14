import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Context/Context';

import WelcomePage from './layouts/WelcomePage/WelcomePage';
import Main from './layouts/Main/Main';
import Auth from './pages/auth/Auth';
import PrivateRoute from './utils/PrivateRoute';

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
    </Route>
  )
);

export default function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}
