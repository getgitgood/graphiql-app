import { http, HttpResponse } from 'msw';

export const schema = {
  data: {
    queryType: {
      name: 'Query'
    },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'Query',
        description: 'Root query type',
        fields: [
          {
            name: 'user',
            description: 'Fetch a user by ID',
            args: [
              {
                name: 'id',
                description: 'ID of the user',
                type: {
                  kind: 'NON_NULL',
                  name: null,
                  ofType: {
                    kind: 'SCALAR',
                    name: 'ID'
                  }
                },
                defaultValue: null
              }
            ],
            type: {
              kind: 'OBJECT',
              name: 'User',
              ofType: null
            }
          }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'User',
        description: 'A user in the system',
        fields: [
          {
            name: 'id',
            description: 'The ID of the user',
            args: [],
            type: {
              kind: 'NON_NULL',
              name: 'ID'
            }
          },
          {
            name: 'name',
            description: 'The name of the user',
            args: [],
            type: {
              kind: 'SCALAR',
              name: 'String'
            }
          },
          {
            name: 'email',
            description: 'The email of the user',
            args: [],
            type: {
              kind: 'SCALAR',
              name: 'String'
            }
          }
        ]
      }
    ]
  }
};
const handlers = [
  http.post(`https://test.io/*`, async () => {
    const res = new HttpResponse(JSON.stringify(schema), {
      status: 400,
      statusText: 'sheet',
      headers: { 'content-type': 'application/json' }
    });
    return res;
  }),
  http.post(`https://identitytoolkit.googleapis.com/*`, async () => {
    return new Response(JSON.stringify({ data: 'success api call' }), {
      status: 200
    });
  }),

  http.post(`https://rickandmortyapi.com/graphql`, async () => {
    return new Response(JSON.stringify({ data: 'success api call' }), {
      status: 200
    });
  }),

  http.post(`https://test`, async () => {
    return new Response(
      JSON.stringify({
        data: {
          so: 'it`s just works!'
        }
      }),
      {
        status: 200
      }
    );
  }),
  http.post(`test-submit`, async () => {
    return new Response(
      JSON.stringify({
        data: {
          so: 'it`s just works!'
        }
      }),
      {
        status: 200
      }
    );
  }),
  http.post(`https://test-doc`, async () => {
    return new Response(
      JSON.stringify({
        data: {
          so: 'it`s just works!'
        }
      }),
      {
        status: 200
      }
    );
  })
];

export default handlers;
