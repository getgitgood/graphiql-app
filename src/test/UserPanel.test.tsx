import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '../store';
import UserPanel from '../layouts/UserPanel/UserPanel';
import '@testing-library/jest-dom';

describe('UserPanel Component', () => {
  it('renders UserPanel component', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPanel />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/EN/i)).toBeInTheDocument();
    expect(screen.getByText(/RU/i)).toBeInTheDocument();
    expect(screen.getByText(/KZ/i)).toBeInTheDocument();
  });
});
