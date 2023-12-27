import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../hooks/appHooks';
import classes from './ErrorPage.module.scss';

export default function ErrorPage() {
  const { titleError, textError, button404 } = useLanguageContext();

  return (
    <main className="main">
      <div className={classes.error_wrapper} data-testid="error-page">
        <h1 className={classes.error_title}>{titleError}</h1>

        <p className={classes.error_message}>{textError}</p>
        <Link className={classes.home} to={'./'}>
          {button404}
        </Link>
      </div>
    </main>
  );
}
