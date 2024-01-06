import { ForwardedRef, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useLanguageContext } from '../../hooks/appHooks';
import UserPanel from '../../layouts/UserPanel/UserPanel';
import { NavigationProps } from '../../types';
import classes from './Navigation.module.scss';

export const Navigation = forwardRef(function Navigation(
  props: NavigationProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { isBurgerOpen, setIsBurgerOpen } = props;
  const { welcomeHeader, mainPage } = useLanguageContext();
  const { isUserSignIn } = useAppSelector((state) => state.project);

  const currentLinkAppearance = () => {
    const link = isUserSignIn ? '/graphiql' : '/';
    const title = isUserSignIn ? mainPage : welcomeHeader;
    return (
      <NavLink className={classes.nav_link} to={link}>
        {title}
      </NavLink>
    );
  };

  const burgerMenuHandler = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <>
      <nav className={classes.container}>
        <NavLink
          className={`${classes.nav_link} ${classes.logo_link}`}
          to="/"
        />
        {currentLinkAppearance()}
        <div className={classes.laptop_container}>
          <UserPanel />
        </div>
        <div
          ref={ref}
          className={`${classes.burger_menu} ${
            isBurgerOpen ? classes.active : ''
          }`}
          onClick={burgerMenuHandler}
        >
          <div className={classes.burger_bar} />
          <div className={classes.burger_bar} />
          <div className={classes.burger_bar} />
        </div>
      </nav>
    </>
  );
});

export default Navigation;
