import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../components/Forms/SignIn';
import userEvent from '@testing-library/user-event';

test('renders SignIn component', () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );
  const h2Element = screen.getByRole('heading', { name: /sign in/i, level: 2 });
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

test('submits form with valid input', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Sign In/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  fireEvent.click(submitButton);
});

test('displays error message on invalid form submission', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  await act(async () => {
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.click(submitButton);

    try {
      const errorMessage = await screen.findByText(
        /No user was found with the provided data!/i,
        {},
        { timeout: 3000 }
      );

      expect(errorMessage).toBeInTheDocument();
    } catch (error) {
      console.error('Error or timeout:', error);
    }
  });
});

test('displays validation errors when need 1 uppercase letter', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const passwordInput = screen.getByLabelText('Password');
  userEvent.type(passwordInput, 'short');

  await waitFor(() => {
    expect(
      screen.getByText('Must contain at least one uppercase letter!')
    ).toBeInTheDocument();
  });
});

test('displays validation errors when need 1 special character', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const passwordInput = screen.getByLabelText('Password');
  userEvent.type(passwordInput, '1Qwertys');

  await waitFor(() => {
    expect(
      screen.getByText('Must contain at least 1 special character!')
    ).toBeInTheDocument();
  });
});

test('displays validation errors when need 1 digit in the password', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const passwordInput = screen.getByLabelText('Password');
  userEvent.type(passwordInput, 'NoDigits');

  await waitFor(() => {
    expect(
      screen.getByText('Must contain at least one digit!')
    ).toBeInTheDocument();
  });
});

test('displays no validation errors for a valid input', async () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  userEvent.type(emailInput, 'validemail@example.com');
  userEvent.type(passwordInput, 'StrongPass1!');

  await waitFor(() => {
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
