import { useNavigate } from 'react-router-dom';
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

  const signInButtonHandler = () => {
    navigate('/auth');
  };

  return (
    <div className={classes.user_icons_wrapper}>
      {isUserLoggedIn ? (
        <>
          <div
            className={classes.user_icon_signout}
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
        <div
          className={classes.user_icon_signin}
          aria-label="sign in button"
          onClick={signInButtonHandler}
        />
      )}
    </div>
  );
}
