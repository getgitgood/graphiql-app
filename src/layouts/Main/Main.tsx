import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
