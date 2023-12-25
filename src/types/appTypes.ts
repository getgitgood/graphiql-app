import { ReactNode } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export type LanguageContextProps = {
  currentLanguage: LanguageEnum;
  changeLanguage: (value: keyof typeof LanguageEnum) => void;
  LanguageEnum: typeof LanguageEnum;
};

export type ContextProps = {
  children: ReactNode;
};

export enum LanguageEnum {
  EN = 'EN',
  RU = 'RU'
}

export type SignUpFormProps = {
  switchFormHandler: () => void;
};

export enum SideMenuOptions {
  Documentation = 'Documentation',
  History = 'History',
  Hidden = ''
}

export type RedirectProps = {
  isUserSignIn: boolean;
  isReversedDirection: boolean;
};

export type graphqlQuery = {
  query: string;
  variables: string;
  headers: string;
};

export type EditorPanelProps = {
  graphqlQuery: graphqlQuery;
  setIsRequestReady: (value: boolean) => void;
};

export type PrivateRouteProps = {
  children: ReactNode;
  redirectTo: string;
  isReversedDirection?: boolean;
};

export type EditorProps = {
  setUserQuery: (value: string) => void;
  children: ReactNode;
};
