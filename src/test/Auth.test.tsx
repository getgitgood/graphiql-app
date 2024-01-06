import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Auth from '../pages/Auth/Auth';

test('renders Auth component with default form type', () => {
  render(<Auth />, { wrapper: MemoryRouter });
  const signInElements = screen.getAllByText(/sign in/i);
  expect(signInElements.length).toBeGreaterThan(0);
});

test('renders Auth component with default form type and matches snapshot', () => {
  const { asFragment } = render(<Auth />, { wrapper: MemoryRouter });
  expect(asFragment()).toMatchSnapshot();
});
