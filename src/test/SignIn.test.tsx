import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../components/Forms/SignIn';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import server from './server/server';

const user = userEvent.setup();

let isFirebaseCalled = false;

beforeEach(() => {
  isFirebaseCalled = false;
});

server.events.on('request:start', ({ request }) => {
  const url = new URL(request.url);

  const { hostname } = url;

  switch (hostname) {
    case 'identitytoolkit.googleapis.com':
      isFirebaseCalled = true;
      return;
  }
});

describe('SignIn Component', () => {
  test('render SignIn component', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const h2Element = screen.getByRole('heading', {
      name: /sign in/i,
      level: 2
    });
    expect(h2Element).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', { name: /sign in/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders SignIn component with button', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole('button', { name: /Sign In/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('submit button is enabled with valid data and form is submitted', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123!A');

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    await waitFor(() => {
      expect(isFirebaseCalled).toBe(true);
    });
  });

  test('submit button is disabled with invalid data', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.type(emailInput, 'testexamplecom');
    await user.type(passwordInput, 'password');

    expect(submitButton).toBeDisabled();
  });

  test('displays validation errors when need 1 uppercase letter', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'short');
    expect(
      screen.getByText('Must contain at least one uppercase letter!')
    ).toBeInTheDocument();
  });

  test('displays validation errors when need 1 special character', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, '1Qwertys');
    expect(
      screen.getByText('Must contain at least 1 special character!')
    ).toBeInTheDocument();
  });

  test('displays validation errors when need 1 digit in the password', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'NoDigits');
    expect(
      screen.getByText('Must contain at least one digit!')
    ).toBeInTheDocument();
  });

  test('displays no validation errors for a valid input', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    await user.type(emailInput, 'validemail@example.com');
    await user.type(passwordInput, 'StrongPass1!');
    expect(
      screen.queryByText('Incorrect email! (e.g. example@gmail.com)')
    ).toBeNull();
    expect(
      screen.queryByText('Must contain at least one uppercase letter!')
    ).toBeNull();
    expect(screen.queryByText('Must contain at least one digit!')).toBeNull();
    expect(
      screen.queryByText('Must be at least 8 characters long!')
    ).toBeNull();
    expect(
      screen.queryByText('Must contain at least 1 special character!')
    ).toBeNull();
    expect(screen.queryByText('Passwords must match')).toBeNull();
  });

  test('displays no validation errors for a valid input', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    await user.type(emailInput, 'validemail@example.com');
    await user.type(passwordInput, 'StrongPass1!');
    expect(
      screen.queryByText('Incorrect email! (e.g. example@gmail.com)')
    ).toBeNull();
    expect(
      screen.queryByText('Must contain at least one uppercase letter!')
    ).toBeNull();
    expect(screen.queryByText('Must contain at least one digit!')).toBeNull();
    expect(
      screen.queryByText('Must be at least 8 characters long!')
    ).toBeNull();
    expect(
      screen.queryByText('Must contain at least 1 special character!')
    ).toBeNull();
    expect(screen.queryByText('Passwords must match')).toBeNull();
  });
});
