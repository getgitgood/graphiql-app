import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Auth from '../pages/Auth/Auth';
import { renderWithAct } from './utils/helpers';
import { MemoryRouter } from 'react-router';

describe('Test Auth Component', () => {
  test('renders Auth component with default form type', async () => {
    await renderWithAct(<Auth />);
    const signInForm = screen.getByTestId('signin-form');
    expect(signInForm).toBeInTheDocument();
  });

  test('renders proper form base on passed state', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/auth',
          {
            state: {
              formType: 'signup'
            }
          }
        ]}
      >
        <Auth />
      </MemoryRouter>
    );

    const signUpForm = screen.getByTestId('signup-form');
    expect(signUpForm).toBeInTheDocument();
  });

  test('renders proper form base on passed state', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/auth',
          {
            state: {
              formType: 'signin'
            }
          }
        ]}
      >
        <Auth />
      </MemoryRouter>
    );

    const signInForm = screen.getByTestId('signin-form');
    expect(signInForm).toBeInTheDocument();
  });
});
