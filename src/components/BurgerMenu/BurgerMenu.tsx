import { onAuthStateChanged } from 'firebase/auth';
import { ForwardedRef, forwardRef } from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseAuth';
import { NavigationProps } from '../../types';
import { formatDisplayedName } from '../../utils/helpers';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import UserIcons from '../UserIcons/UserIcons';
import classes from './BurgerMenu.module.scss';

export const BurgerMenu = forwardRef(function BurgerMenu(
  props: NavigationProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { isBurgerOpen, setIsBurgerOpen } = props;

  const layoutHandler = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
        localStorage.removeItem('tokenExp');
      }
    });
  });

  return (
    <div
      className={`${classes.menu_layout} ${isBurgerOpen ? classes.open : ''}`}
      onClick={layoutHandler}
      ref={ref}
      data-testid={'burger-menu'}
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
});

export default BurgerMenu;
