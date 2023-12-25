import { createContext, useState } from 'react';
import { ContextProps, graphqlQuery } from '../../types';

export type EditorContextProps = {
  graphqlQuery: graphqlQuery;
  setUserQuery: (value: string) => void;
  setUserVariables: (value: string) => void;
  setUserHeaders: (value: string) => void;
  setParseError: (error: Error | null) => void;
  setIsRequestCollecting: (value: boolean) => void;
  isRequestCollecting: boolean;
  parseError: Error | null;
};

export const EditorContext = createContext<EditorContextProps | null>(null);

export default function EditorContextProvider({ children }: ContextProps) {
  const [isRequestCollecting, setIsRequestCollecting] = useState(true);

  const [query, setUserQuery] = useState('');
  const [variables, setUserVariables] = useState('');
  const [headers, setUserHeaders] = useState('');
  const [parseError, setParseError] = useState<Error | null>(null);

  const graphqlQuery = {
    query: query,
    variables: variables,
    headers: headers
  };

  return (
    <EditorContext.Provider
      value={{
        setUserQuery,
        setUserVariables,
        setUserHeaders,
        setParseError,
        setIsRequestCollecting,
        isRequestCollecting,
        parseError,
        graphqlQuery
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
