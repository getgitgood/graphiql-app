import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Context/Context';
import Main from './layouts/Main/Main';

const router = createBrowserRouter(
  createRoutesFromElements(<Route index element={<Main />} path="/" />)
);

export default function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}
