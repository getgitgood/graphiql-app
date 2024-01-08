import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import UserIcons from '../components/UserIcons/UserIcons';
import { setupStore } from '../store';
import '@testing-library/jest-dom';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe('UserIcons Component', () => {
  it('renders UserIcons component when the user is logged in', async () => {
    const mockUser: Partial<User> = {
      email: 'test@example.com',
      emailVerified: true,
      isAnonymous: false,
      uid: 'test-uid'
    };

    const getAuthMock = getAuth as jest.Mock;
    const onAuthStateChangedMock = onAuthStateChanged as jest.Mock;
    getAuthMock.mockReturnValue({
      currentUser: mockUser as User
    });

    onAuthStateChangedMock.mockImplementation((_, callback) => {
      callback(mockUser as User);
    });

    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserIcons />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('sign out button')).toBeInTheDocument();
    });
  });

  it('renders UserIcons component when user is logged out', async () => {
    const getAuthMock = getAuth as jest.Mock;
    const onAuthStateChangedMock = onAuthStateChanged as jest.Mock;
    getAuthMock.mockReturnValue({
      currentUser: null
    });

    onAuthStateChangedMock.mockImplementation((_, callback) => {
      callback(null);
    });

    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserIcons />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('sign up button')).toBeInTheDocument();
      expect(screen.getByLabelText('sign in button')).toBeInTheDocument();
    });
  });
});
