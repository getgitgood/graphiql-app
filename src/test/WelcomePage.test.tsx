import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from '../layouts/WelcomePage/WelcomePage';
import { setupStore } from '../store';

describe('WelcomePage component', () => {
  test('renders WelcomePage component', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/About the Project/i)).toBeInTheDocument();
    expect(screen.getByText(/About the Developers/i)).toBeInTheDocument();
    expect(screen.getByText(/About the Course/i)).toBeInTheDocument();
  });

  test('renders project content', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/GraphiQL is a powerful playground/i)
    ).toBeInTheDocument();
  });

  test('renders developers content', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/We are the LuckyCoders team/i)
    ).toBeInTheDocument();
  });

  test('renders course content', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WelcomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/The React RS School course/i)).toBeInTheDocument();
  });
});
