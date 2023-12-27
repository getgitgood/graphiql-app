import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../hooks/appHooks';
import classes from './Page404.module.scss';

export default function Page404() {
  const { title404, text404, button404 } = useLanguageContext();
  return (
    <div className={classes.not_found_wrapper} data-testid="page-404">
      <h1 className={classes.title}>{title404}</h1>
      <p className={classes.description}>{text404}</p>
      <Link className={classes.home} to={'/'}>
        {button404}
      </Link>
    </div>
  );
}
