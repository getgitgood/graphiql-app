import { IntrospectionQuery } from 'graphql';

export type ApiQueryRequest = {
  [key: string]: string | undefined | object;
  query: string;
  userHeaders: object;
  userVariables: object;
};

export type IntrospectionQueryData = {
  data: IntrospectionQuery;
};

export interface ResponseQueryData extends IntrospectionQueryData {
  data: IntrospectionQuery;
}
