import 'whatwg-fetch';
import server from './server/server';
import '@testing-library/jest-dom';

import 'firestore-jest-mock';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());
