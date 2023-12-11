import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SignIn = React.lazy(() => import('./pages/auth/SignIn'));
const SignUp = React.lazy(() => import('./pages/auth/SignUp'));
// const Main = React.lazy(() => import('./pages/welcome/WelcomePage')); // она же welcome page

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={<Main />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
