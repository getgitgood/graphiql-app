import 'whatwg-fetch';
import '@testing-library/jest-dom';
import 'firestore-jest-mock';
import server from './server/server';

beforeAll(() => {
  server.resetHandlers();
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => server.close());
