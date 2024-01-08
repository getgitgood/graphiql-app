import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';
import { getIntrospectionQuery } from 'graphql';
import {
  ApiQueryRequest,
  IntrospectionQueryData,
  ResponseQueryData
} from '../types';

const IntrospectionQuery = getIntrospectionQuery;

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const userEndpoint = (api.getState() as RootState).project.userEndpoint;

  const baseQueryWithDynamicUrl = fetchBaseQuery({
    baseUrl: `${userEndpoint}`
  });

  return baseQueryWithDynamicUrl(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getData: builder.query<ResponseQueryData, ApiQueryRequest>({
      query: ({ query, userHeaders, userVariables }) => ({
        url: '',
        body: {
          query: query,
          variables: userVariables
        },
        method: 'POST',
        headers: userHeaders as Headers
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
