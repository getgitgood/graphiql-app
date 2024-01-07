import { render, screen, waitFor } from '@testing-library/react';
import Main from '../layouts/Main/Main';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Main Component', () => {
  it('renders Main component', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('main page')).toBeInTheDocument();
    });
  });
});
