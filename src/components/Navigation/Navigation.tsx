import { NavLink } from 'react-router-dom';
import UserPanel from '../../layouts/UserPanel/UserPanel';
import classes from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={classes.container}>
      <NavLink className={`${classes.nav_link} ${classes.logo_link}`} to="/" />
      <NavLink className={classes.nav_link} to="/welcome">
        Welcome
      </NavLink>
      <UserPanel />
    </nav>
  );
}
