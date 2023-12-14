import { useNavigate } from 'react-router-dom';
import classes from './UserIcons.module.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseAuth';

export default function UserIcons() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  const signOutButtonHandler = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (e) {
      // TODO: Add a proper user notification about logout issues
      console.log(e);
    }
  };

  const signInButtonHandler = () => {
    navigate('/auth');
  };

  return (
    <div className={classes.user_icons_wrapper}>
      {isUserLoggedIn ? (
        <div
          className={classes.user_icon_signout}
          aria-label="sign out button"
          onClick={signOutButtonHandler}
        />
      ) : (
        <div
          className={classes.user_icon_signin}
          aria-label="sign in button"
          onClick={signInButtonHandler}
        />
      )}
    </div>
  );
}
