import classes from './LanguageSelector.module.scss';
import { MouseEvent, useContext } from 'react';
import { AppContext } from '../Context/Context';
import { LanguageEnum } from '../../types';

export default function LanguageSelector() {
  const context = useContext(AppContext);
  const [en, ru, kz] = Object.values(context.LanguageEnum);

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
    <div className={classes.language_selectors} onClick={changeLanguageHandler}>
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
      <div
        className={`${classes.language_selector} ${
          currentLanguage === 'KZ' ? classes.lang_active : ''
        }`}
        data-language={kz}
      >
        {kz}
      </div>
    </div>
  );
}
