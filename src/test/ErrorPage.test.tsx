import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

jest.mock('../hooks/appHooks', () => ({
  useLanguageContext: () => ({
    titleError: 'Error Title',
    textError: 'Error Message',
    button404: 'Back to Home'
  })
}));

test('renders ErrorPage component', () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Error Title/i)).toBeInTheDocument();
  expect(screen.getByText(/Error Message/i)).toBeInTheDocument();
});

test('navigates to home when clicking the link', () => {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Back to Home/i });
  userEvent.click(homeLink);
});
