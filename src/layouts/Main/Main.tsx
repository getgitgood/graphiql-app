import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getUserAuthStatus } from '../../features/projectSlice';
import { useAppDispatch } from '../../hooks/appHooks';
import { Suspense, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

export default function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAuthStatus());
  });

  return (
    <>
      <Header />
      <main className="main">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
