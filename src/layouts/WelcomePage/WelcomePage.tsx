import React, { useContext } from 'react';
import classes from './WelcomePage.module.scss';
import { AppContext } from '../../components/Context/Context';

const WelcomePage: React.FC = () => {
  const context = useContext(AppContext);
  const {
    aboutProject,
    aboutDevelopers,
    aboutCourse,
    textProject,
    textCourse,
    textDevelopers
  } = context.translations[context.currentLanguage];

  return (
    <section className={classes.about}>
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
  );
};

export default WelcomePage;
