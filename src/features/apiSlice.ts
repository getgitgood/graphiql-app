import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

const IntrospectionQuery = getIntrospectionQuery;

export type IntrospectionQueryData = {
  data: IntrospectionQuery;
};

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const userEndpoint = (api.getState() as RootState).project.userEndpoint;

  if (!userEndpoint) {
    return {
      data: {},
      errors: ["GraphQL server on specified endpoint doesn't respond!"]
    };
  }

  const baseQueryWithDynamicUrl = fetchBaseQuery({
    baseUrl: `https://${userEndpoint}`
  });

  return baseQueryWithDynamicUrl(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    // TODO: TYPE A PASSED PARAMETERS AND RETURN TYPE BELOW
    getData: builder.query({
      query: (graphqlQuery) => ({
        url: '',
        body: {
          query: graphqlQuery
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    schema: builder.query<IntrospectionQueryData, string>({
      query: () => ({
        url: '',
        body: {
          operationName: 'IntrospectionQuery',
          query: IntrospectionQuery()
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })
});

export const { useGetDataQuery, useSchemaQuery } = api;
