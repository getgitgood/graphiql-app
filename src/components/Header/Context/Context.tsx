import { ReactNode, createContext, useState, useContext } from 'react';
import { LanguageContextProps, LanguageEnum } from '../../../types';
export type ContextProps = {
  children: ReactNode;
};

export const defaultValue = {
  currentLanguage: LanguageEnum.EN,
  changeLanguage: (value: string) => value,
  LanguageEnum: LanguageEnum
};

export const AppContext = createContext<LanguageContextProps>(defaultValue);

export default function AppContextProvider({ children }: ContextProps) {
  const context = useContext(AppContext);
  const [currentLanguage, setLanguage] = useState(context.currentLanguage);

  const changeLanguage = (value: keyof typeof LanguageEnum) => {
    if (typeof value === 'string' && value in LanguageEnum) {
      setLanguage(LanguageEnum[value]);
    } else {
      console.log('There is not such language!');
    }
  };

  const values = {
    changeLanguage,
    currentLanguage,
    LanguageEnum
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
