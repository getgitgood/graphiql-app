import { NavLink } from 'react-router-dom';
import UserPanel from '../../layouts/UserPanel/UserPanel';
import classes from './Navigation.module.scss';
import { useContext } from 'react';
import { AppContext } from '../Context/Context';

export default function Navigation() {
  const context = useContext(AppContext);
  const { welcomeHeader } = context.translations[context.currentLanguage];

  return (
    <nav className={classes.container}>
      <NavLink className={`${classes.nav_link} ${classes.logo_link}`} to="/" />
      <NavLink className={classes.nav_link} to="/">
        {welcomeHeader}
      </NavLink>
      <UserPanel />
    </nav>
  );
}
