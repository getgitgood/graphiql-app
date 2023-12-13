import React from 'react';
import classes from './WelcomePage.module.scss';

const WelcomePage: React.FC = () => {
  return (
    <section className={classes.about}>
      <section className={classes.about_content}>
        <h2>About the Project</h2>
        <p>Here goes some information about the project...</p>
      </section>
      <section className={classes.about_content}>
        <h2>About the Developers</h2>
        <p>Meet our talented team of developers...</p>
      </section>
      <section className={classes.about_content}>
        <h2>About the Course</h2>
        <p>Information about the course goes here...</p>
      </section>
    </section>
  );
};

export default WelcomePage;
