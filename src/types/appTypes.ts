export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export type LanguageContextProps = {
  currentLanguage: LanguageEnum;
  changeLanguage: (value: keyof typeof LanguageEnum) => void;
  LanguageEnum: typeof LanguageEnum;
};

export enum LanguageEnum {
  EN = 'EN',
  RU = 'RU'
}
