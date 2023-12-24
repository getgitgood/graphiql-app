import { IntrospectionQuery } from 'graphql';

export type ApiQueryRequest = {
  [key: string]: string | undefined;
  query: string;
  headers: string;
  variables: string;
};

export type IntrospectionQueryData = {
  data: IntrospectionQuery;
};

export interface ResponseQueryData extends IntrospectionQueryData {
  data: IntrospectionQuery;
}
