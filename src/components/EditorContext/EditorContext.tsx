import { createContext, useEffect, useReducer, useState } from 'react';
import { ContextProps, graphqlQuery } from '../../types';
import { queryPrettify } from '../../utils/helpers';

export type CmTextLeaf = {
  length: number;
  text: string[];
};

export type EditorContextProps = {
  graphqlQuery: graphqlQuery;
  setUserQuery: (value: string) => void;
  setUserVariables: (value: string) => void;
  setUserHeaders: (value: string) => void;
  setParseError: (error: Error | null) => void;
  setIsRequestCollecting: (value: boolean) => void;
  setIsCleanerCalled: (query: boolean) => void;
  queryUpdateCounter: number;
  prettifiedQuery: string;
  isCleanerCalled: boolean;
  isRequestCollecting: boolean;
  parseError: Error | null;
};

export const EditorContext = createContext<EditorContextProps | null>(null);

export default function EditorContextProvider({ children }: ContextProps) {
  const [isRequestCollecting, setIsRequestCollecting] = useState(true);

  const [userQuery, setUserQuery] = useState('');

  const [variables, setUserVariables] = useState('');
  const [headers, setUserHeaders] = useState('');
  const [parseError, setParseError] = useState<Error | null>(null);
  const [prettifiedQuery, setPrettifiedQuery] = useState('');
  const [isCleanerCalled, setIsCleanerCalled] = useState(false);
  const [queryUpdateCounter, forceUpdateCounter] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!isCleanerCalled) return;
    const query = queryPrettify(userQuery);
    if (query === userQuery) return;
    setUserQuery(queryPrettify(userQuery));
    setPrettifiedQuery(queryPrettify(userQuery));
    forceUpdateCounter();
    setIsCleanerCalled(false);
  }, [isCleanerCalled, userQuery, prettifiedQuery]);

  const graphqlQuery = {
    query: userQuery,
    variables: variables,
    headers: headers
  };

  return (
    <EditorContext.Provider
      value={{
        setUserQuery,
        setUserVariables,
        setUserHeaders,
        prettifiedQuery,
        setParseError,
        setIsRequestCollecting,
        setIsCleanerCalled,
        isCleanerCalled,
        queryUpdateCounter,
        isRequestCollecting,
        parseError,
        graphqlQuery
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
