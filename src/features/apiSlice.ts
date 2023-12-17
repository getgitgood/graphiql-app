import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

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

  // const urlEnd = typeof args === 'string' ? args : args.url;
  // const adjustedUrl = `${userEndpoint}/${urlEnd}`;
  // console.log(userEndpoint);
  // const adjustedArgs =
  //   typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };

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
    })
  })
});

export const { useGetDataQuery } = api;
