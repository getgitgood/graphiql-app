import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Page404 from '../pages/Page404/Page404';

jest.mock('../hooks/appHooks', () => ({
  useLanguageContext: () => ({
    title404: '404 Title',
    text404: '404 Message',
    button404: 'Back to Home'
  })
}));

test('renders Page404 component', () => {
  render(
    <MemoryRouter>
      <Page404 />
    </MemoryRouter>
  );
  expect(screen.getByText(/404 Title/i)).toBeInTheDocument();
  expect(screen.getByText(/404 Message/i)).toBeInTheDocument();
});

test('navigates to home when clicking the link', () => {
  render(
    <MemoryRouter>
      <Page404 />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /Back to Home/i });
  userEvent.click(homeLink);
});
