import { createContext, useState, useContext } from 'react';
import { ContextProps, LanguageContextProps, LanguageEnum } from '../../types';
import enTranslations from '../../translations/en.json';
import ruTranslations from '../../translations/ru.json';

const translations = {
  EN: enTranslations,
  RU: ruTranslations
};

export const defaultValue: LanguageContextProps = {
  currentLanguage: LanguageEnum.EN,
  changeLanguage: (value: keyof typeof LanguageEnum) => value,
  LanguageEnum,
  translations: translations
};

export const AppContext = createContext<LanguageContextProps>(defaultValue);

export default function AppContextProvider({ children }: ContextProps) {
  const context = useContext(AppContext);
  const [currentLanguage, setLanguage] = useState(context.currentLanguage);

  const changeLanguage = (value: keyof typeof LanguageEnum) => {
    if (typeof value === 'string' && value in LanguageEnum) {
      setLanguage(LanguageEnum[value]);
    } else {
      console.log('There is no such language!');
    }
  };

  const values = {
    translations,
    changeLanguage,
    currentLanguage,
    LanguageEnum
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
