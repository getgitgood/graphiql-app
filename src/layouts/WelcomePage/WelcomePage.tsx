import React from 'react';
import classes from './WelcomePage.module.scss';
import { useLanguageContext } from '../../hooks/appHooks';
import UserIcons from '../../components/UserIcons/UserIcons';

const WelcomePage: React.FC = () => {
  const {
    aboutProject,
    aboutDevelopers,
    aboutCourse,
    textProject,
    textCourse,
    textDevelopers
  } = useLanguageContext();

  return (
    <>
      <section className={classes.about}>
        <UserIcons />
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
      </section>
    </>
  );
};

export default WelcomePage;
