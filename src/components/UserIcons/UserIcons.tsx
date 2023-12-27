import { Link, useNavigate } from 'react-router-dom';
import classes from './UserIcons.module.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseAuth';
import { formatDisplayedName } from '../../utils/helpers';
import { useAppDispatch } from '../../hooks/appHooks';
import { updateUserStatus } from '../../features/projectSlice';

export default function UserIcons() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateUserStatus(true));
        setIsUserLoggedIn(true);
        setCurrentUser(user.email);
      } else {
        setIsUserLoggedIn(false);
        setCurrentUser(null);
      }
    });
  }, []);

  const signOutButtonHandler = async () => {
    try {
      await auth.signOut();
      dispatch(updateUserStatus(false));
      navigate('/');
    } catch (e) {
      // TODO: Add a proper user notification about logout issues
      console.log(e);
    }
  };

  return (
    <div className={classes.user_icons_wrapper}>
      {isUserLoggedIn ? (
        <>
          <div
            className={`${classes.user_icon} ${classes.icon_signout}`}
            aria-label="sign out button"
            onClick={signOutButtonHandler}
          />
          {currentUser && (
            <span className={classes.current_user}>
              {formatDisplayedName(currentUser)}
            </span>
          )}
        </>
      ) : (
        <>
          <Link
            className={`${classes.user_icon} ${classes.icon_signin}`}
            aria-label="sign in button"
            to={'/auth'}
            state={{ formType: 'signin' }}
          />
          <Link
            className={`${classes.user_icon} ${classes.icon_signup}`}
            aria-label="sign up button"
            to={'/auth'}
            state={{ formType: 'signup' }}
          />
        </>
      )}
    </div>
  );
}
