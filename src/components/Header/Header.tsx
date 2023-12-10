import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import { MouseEvent, useContext } from 'react';
import { AppContext } from './Context/Context';
import { LanguageEnum } from '../../types';

export default function Header() {
  const context = useContext(AppContext);
  const [en, ru] = Object.values(context.LanguageEnum);

  const changeLanguage = context.changeLanguage;

  const currentLanguage = context.currentLanguage;

  const changeLanguageHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      const value = e.target.dataset.language as keyof typeof LanguageEnum;
      if (value && value in context.LanguageEnum) {
        changeLanguage(value);
      }
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.logo_link} to="/">
          <img className={classes.logo} src="/logo.png" alt="app logo" />
        </Link>

        <div
          className={classes.language_selectors}
          onClick={changeLanguageHandler}
        >
          <div
            className={`${classes.language_selector} ${
              currentLanguage === 'EN' ? classes.lang_active : ''
            }`}
            data-language={en}
          >
            {en}
          </div>
          <div
            className={`${classes.language_selector} ${
              currentLanguage === 'RU' ? classes.lang_active : ''
            }`}
            data-language={ru}
          >
            {ru}
          </div>
        </div>
      </div>
    </header>
  );
}
