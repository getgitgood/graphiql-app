import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/appHooks';
import UserPanel from '../../layouts/UserPanel/UserPanel';
import classes from './Navigation.module.scss';
import { useContext } from 'react';
import { AppContext } from '../Context/Context';

export default function Navigation() {
  const context = useContext(AppContext);
  const { welcomeHeader, mainPage } =
    context.translations[context.currentLanguage];
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

  return (
    <nav className={classes.container}>
      <NavLink className={`${classes.nav_link} ${classes.logo_link}`} to="/" />
      {currentLinkAppearance()}
      <UserPanel />
    </nav>
  );
}
