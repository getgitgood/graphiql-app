import { useState } from 'react';
import classes from './Auth.module.scss';
import SignIn from '../../components/Forms/SignIn';
import SignUp from '../../components/Forms/SignUp';

export default function Auth() {
  const [showSingUp, setShowSignUp] = useState(false);

  const switchFormsHandler = () => {
    setShowSignUp(!showSingUp);
  };

  return (
    <section className={classes.auth}>
      {showSingUp ? (
        <SignUp switchFormHandler={switchFormsHandler} />
      ) : (
        <SignIn switchFormHandler={switchFormsHandler} />
      )}
    </section>
  );
}
