import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseAuth';
import { NavigationProps } from '../../types';
import { formatDisplayedName } from '../../utils/helpers';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import UserIcons from '../UserIcons/UserIcons';
import classes from './BurgerMenu.module.scss';

export default function BurgerMenu({
  isBurgerOpen,
  setIsBurgerOpen
}: NavigationProps) {
  const layoutHandler = () => {
    setIsBurgerOpen(false);
  };

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });
  });

  return (
    <div
      className={`${classes.menu_layout} ${isBurgerOpen ? classes.open : ''}`}
      onClick={layoutHandler}
    >
      <div className={classes.menu_wrapper}>
        {currentUser && (
          <p className={classes.user_name}>
            {formatDisplayedName(currentUser)}
          </p>
        )}
        <div className={classes.controls}>
          <LanguageSelector />
          <UserIcons />
        </div>
      </div>
    </div>
  );
}
