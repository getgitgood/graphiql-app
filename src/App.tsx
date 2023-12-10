import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import AppContextProvider from './components/Header/Context/Context';
import Header from './components/Header/Header';

function Main() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
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
