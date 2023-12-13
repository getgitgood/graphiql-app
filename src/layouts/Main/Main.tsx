import { Outlet } from 'react-router-dom';
// import Footer from '../Footer/Footer';

export default function Main() {
  return (
    <>
      <main className="main">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
