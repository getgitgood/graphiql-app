import classes from './WelcomePage.module.scss';
import { useAppSelector, useLanguageContext } from '../../hooks/appHooks';
import UserIcons from '../../components/UserIcons/UserIcons';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const { isUserSignIn } = useAppSelector((state) => state.project);
  const {
    aboutProject,
    aboutDevelopers,
    aboutCourse,
    textProject,
    textCourse,
    textDevelopers,
    mainPage
  } = useLanguageContext();

  return (
    <>
      <section className={classes.about}>
        {isUserSignIn ? (
          <div className={classes.link_wrapper}>
            <Link to={'/graphiql'} className={classes.link}>
              {mainPage}
            </Link>
          </div>
        ) : (
          <UserIcons />
        )}
        <div className={classes.about_wrapper}>
          <section className={classes.about_content}>
            <h2>{aboutProject}</h2>
            <p>{textProject}</p>
          </section>
          <section className={classes.about_content}>
            <h2>{aboutDevelopers}</h2>
            <p>{textDevelopers}</p>
          </section>
          <section className={classes.about_content}>
            <h2>{aboutCourse}</h2>
            <p>{textCourse}</p>
          </section>
        </div>
      </section>
    </>
  );
};

export default WelcomePage;
