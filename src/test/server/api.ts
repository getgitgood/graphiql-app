import { http } from 'msw';

const handlers = [
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
  })
];

export default handlers;
