import 'whatwg-fetch';
import server from './server/server';
import '@testing-library/jest-dom';
import 'firestore-jest-mock';

beforeAll(() => {
  server.resetHandlers();
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

// server.events.on('request:start', ({ request }) => {
//   console.log('msw invoked', request.url, request.method);
// });
