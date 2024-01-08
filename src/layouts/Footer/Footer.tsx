import classes from './Footer.module.scss';

export default function Footer() {
  return (
    <footer data-testid={'footer'}>
      <div className={classes.footer_content}>
        <div className={classes.course_wrapper}>
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/rs_school.png" alt="Course Logo" />
          </a>
        </div>
        <div className={classes.github_wrapper}>
          <a
            href="https://github.com/alima987"
            target="_blank"
            rel="noopener noreferrer"
          >
            alima987
          </a>
          <a
            href="https://github.com/getgitgood"
            target="_blank"
            rel="noopener noreferrer"
          >
            getgitgood
          </a>
          <a
            href="https://github.com/ArtemDolgopolov"
            target="_blank"
            rel="noopener noreferrer"
          >
            ArtemDolgopolov
          </a>
        </div>

        <div className={classes.year_wrapper}>© 2023</div>
      </div>
    </footer>
  );
}
